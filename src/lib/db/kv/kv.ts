import type { Kv, KvKey } from '@deno/kv';
import type * as db from '$lib/db';
import * as discordAPI from '$lib/discord/api';
import { DISCORD_BOT_TOKEN } from '$env/static/private';

export enum KvCollection {
	USERS_BY_DISCORD_USER_ID = 'users_by_discord_user_id',
	USERS_BY_SESSION_ID = 'users_by_session_id',
	FORMS_BY_ID = 'forms_by_id',
	FORMS_BY_USER_ID = 'forms_by_user_id',
	SUBMISSIONS_BY_ID = 'submissions_by_id',
	SUBMISSIONS_BY_FORM_ID = 'submissions_by_form_id',
	ACTIVE_FORM = 'active_form',
	WIP_FORM_BY_INVITE_ID = 'wip_form_by_invite_id'
}

export class KvStore implements db.Store {
	constructor(private readonly kv: Kv, private readonly kvNamespace: KvKey = []) {}

	public async getForms(): Promise<db.Form[]> {
		const prefix = this.key(KvCollection.FORMS_BY_ID);
		const forms: db.Form[] = [];
		for await (const entry of this.kv.list<db.Form>({ prefix })) {
			forms.push(entry.value);
		}

		return forms;
	}

	public async getFormByID(id: string): Promise<db.Form | null> {
		const formKey = this.key(KvCollection.FORMS_BY_ID, id);
		const formResult = await this.kv.get<db.Form>(formKey);
		return formResult.value;
	}

	public async getFormByUserID(id: string): Promise<db.Form[]> {
		const prefix = this.key(KvCollection.FORMS_BY_USER_ID, id);
		const forms: db.Form[] = [];
		for await (const entry of this.kv.list<boolean>({ prefix })) {
			const formID = entry.key.at(-1) as string;
			const formKey = this.key(KvCollection.FORMS_BY_ID, formID);
			const formResult = await this.kv.get<db.Form>(formKey);
			if (formResult.value) {
				forms.push(formResult.value);
			}
		}
		return forms;
	}

	public async getUserByDiscordUserID(id: string) {
		const userKey = this.key(KvCollection.USERS_BY_DISCORD_USER_ID, id);
		const userResult = await this.kv.get<db.User>(userKey);
		return userResult.value;
	}

	public async getUserBySessionID(id: string): Promise<db.User | null> {
		const userKey = this.key(KvCollection.USERS_BY_SESSION_ID, id);
		const userResult = await this.kv.get<db.User>(userKey);
		return userResult.value;
	}

	public async getSubmissionByID(id: string): Promise<db.Submission | null> {
		const submissionKey = this.key(KvCollection.SUBMISSIONS_BY_ID, id);
		const submissionResult = await this.kv.get<db.Submission>(submissionKey);
		return submissionResult.value;
	}

	public async getSubmissionsByFormID(id: string): Promise<db.Submission[]> {
		const prefix = this.key(KvCollection.SUBMISSIONS_BY_FORM_ID, id);
		const submissions: db.Submission[] = [];
		for await (const entry of this.kv.list<db.Submission>({ prefix })) {
			submissions.push(entry.value);
		}

		return submissions;
	}

	public async createForm(r: db.CreateFormRequest): Promise<db.Form> {
		const formKey = this.key(KvCollection.FORMS_BY_ID, r.id);

		const result = await this.kv.set(formKey, r);
		if (!result.ok) {
			throw new Error('Failed to create form.');
		}

		// Could include editor ids in the request instead.
		for (const editorID of Object.keys(r.permissions?.edit ?? {})) {
			const idxKey = this.key(KvCollection.FORMS_BY_USER_ID, editorID, r.id);
			const res = await this.kv.set(idxKey, true);
			if (!res.ok) {
				throw new Error('Failed to key form by user ID.');
			}
		}

		return r;
	}

	public async createUser(r: db.CreateUserRequest): Promise<db.User> {
		const id: db.ID = crypto.randomUUID();
		const user: db.User = {
			id,
			discordUserID: r.discordUserID,
			discordUsername: r.discordUsername,
			discordAvatar: r.discordAvatar
		};

		const usersByDiscordUserIDKey = this.key(
			KvCollection.USERS_BY_DISCORD_USER_ID,
			r.discordUserID
		);

		const atomicOp = this.kv.atomic();
		if (r.sessionID) {
			if (!r.sessionTTL) {
				throw new Error('Session TTL is required when session ID is provided.');
			}
			const usersBySessionIDKey = this.key(KvCollection.USERS_BY_SESSION_ID, r.sessionID);
			atomicOp.set(usersBySessionIDKey, user, { expireIn: r.sessionTTL * 1000 });
		}

		const result = await atomicOp
			// I thought this check was necessary, but it causes an error.
			// .check({ key: usersByDiscordUserIDKey, versionstamp: null })
			.set(usersByDiscordUserIDKey, user)
			.commit();
		if (!result.ok) {
			throw new Error('Failed to create user.');
		}

		return user;
	}

	public async createSession(r: db.CreateSessionRequest): Promise<db.User> {
		const usersByDiscordUserIDKey = this.key(
			KvCollection.USERS_BY_DISCORD_USER_ID,
			r.discordUserID
		);
		const userResult = await this.kv.get<db.User>(usersByDiscordUserIDKey);
		if (!userResult.value) {
			throw new Error(`User not found for discordUserID: ${r.discordUserID}`);
		}

		const updatedUser = {
			...userResult.value,
			discordUsername: r.discordUsername,
			discordAvatar: r.discordAvatar
		};

		const usersBySessionIDKey = this.key(KvCollection.USERS_BY_SESSION_ID, r.sessionID);
		const result = await this.kv
			.atomic()
			.check(userResult)
			.set(usersByDiscordUserIDKey, updatedUser)
			.set(usersBySessionIDKey, updatedUser, { expireIn: r.sessionTTL * 1000 })
			.commit();
		if (!result.ok) {
			throw new Error('Failed to create session.');
		}

		return updatedUser;
	}

	public async createSubmission(r: db.CreateSubmissionRequest): Promise<db.Submission> {
		const submissionsByIDKey = this.key(KvCollection.SUBMISSIONS_BY_ID, r.id);
		const submissionsByFormIDKey = this.key(KvCollection.SUBMISSIONS_BY_FORM_ID, r.formID, r.id);
		// https://docs.deno.com/kv/manual/secondary_indexes#non-unique-indexes-one-to-many
		const result = await this.kv
			.atomic()
			.check({ key: submissionsByIDKey, versionstamp: null })
			.set(submissionsByIDKey, r)
			.set(submissionsByFormIDKey, r)
			.commit();
		if (!result.ok) {
			throw new Error('Failed to create submission.');
		}

		return r;
	}

	public async deleteFormByID(id: string): Promise<void> {
		const formKey = this.key(KvCollection.FORMS_BY_ID, id);
		const submissions = await this.getSubmissionsByFormID(id);
		const op = this.kv.atomic().delete(formKey);
		for (const submission of submissions) {
			const submissionKey = this.key(KvCollection.SUBMISSIONS_BY_ID, submission.id);
			op.delete(submissionKey);
		}

		const result = await op.commit();
		if (!result.ok) {
			throw new Error('Failed to delete form.');
		}
	}

	public async deleteSessionByID(id: string): Promise<void> {
		const usersBySessionIDKey = this.key(KvCollection.USERS_BY_SESSION_ID, id);
		await this.kv.delete(usersBySessionIDKey);
	}

	public async deleteSubmissionByID(id: string): Promise<void> {
		const submissionsByIDKey = this.key(KvCollection.SUBMISSIONS_BY_ID, id);
		const submissionResult = await this.kv.get<db.Submission>(submissionsByIDKey);
		if (!submissionResult.value) {
			throw new Error(`Submission not found for id: ${id}`);
		}

		const submissionsByFormIDKey = this.key(
			KvCollection.SUBMISSIONS_BY_FORM_ID,
			submissionResult.value.formID,
			id
		);
		const result = await this.kv
			.atomic()
			.check(submissionResult)
			.delete(submissionsByIDKey)
			.delete(submissionsByFormIDKey)
			.commit();
		if (!result.ok) {
			throw new Error('Failed to delete submission.');
		}
	}

	public async saveFormEditor(form: db.SaveFormEditorRequest): Promise<void> {
		const formKey = this.key(KvCollection.FORMS_BY_ID, form.id);
		const formResult = await this.kv.get<db.Form>(formKey);
		if (!formResult.value) {
			throw new Error(`Form not found for id: ${form.id}`);
		}
		// TODO: either add a function that adds editors and views to the form
		// or just update the form with the new permissions.
		const result = await this.kv.atomic().check(formResult).set(formKey, form).commit();
		if (!result.ok) {
			throw new Error('Failed to save form.');
		}
	}

	public async deleteFormEditor(form: db.DeleteFormEditorRequest): Promise<void> {
		const formKey = this.key(KvCollection.FORMS_BY_ID, form.id);
		const formResult = await this.kv.get<db.Form>(formKey);
		if (!formResult.value) {
			throw new Error(`Form not found for id: ${form.id}`);
		}

		const atomicOp = await this.kv.atomic().check(formResult).delete(formKey);

		const permissions = form.permissions;
		for (const editorID of Object.keys(permissions.edit ?? {})) {
			const idxKey = this.key(KvCollection.FORMS_BY_USER_ID, editorID, form.id);
			atomicOp.delete(idxKey);
		}

		const result = await atomicOp.commit();
		if (!result.ok) {
			throw new Error('Failed to delete form editor.');
		}
	}

	public async checkActiveForm(id: string): Promise<boolean> {
		const activeFormKey = this.key(KvCollection.ACTIVE_FORM, id);
		const activeFormResult = await this.kv.get<boolean>(activeFormKey);
		if (activeFormResult.value) {
			return true;
		}
		return false;
	}

	public async activateForm(form: db.Form): Promise<void> {
		const id = form.id;
		const activeFormKey = this.key(KvCollection.ACTIVE_FORM, id);

		const result = await this.kv.atomic().set(activeFormKey, true).commit();
		if (!result.ok) {
			throw new Error('Failed to activate form.');
		}

		discordAPI.createMessage({
			body: {
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 1,
								label: 'Get Form: ' + form.title,
								custom_id: form.id
							}
						]
					}
				]
			},
			channelID: '1336983646317580331',
			botToken: DISCORD_BOT_TOKEN
		});
	}

	public async deactivateForm(id: string): Promise<void> {
		const activeFormKey = this.key(KvCollection.ACTIVE_FORM, id);
		const result = await this.kv.atomic().delete(activeFormKey).commit();
		if (!result.ok) {
			throw new Error('Failed to deactivate form.');
		}
	}

	public async getWIPFormByInviteID(id: string): Promise<db.WIPForm | null> {
		const wipFormKey = this.key(KvCollection.WIP_FORM_BY_INVITE_ID, id);
		const wipFormResult = await this.kv.get<db.WIPForm>(wipFormKey);
		return wipFormResult.value;
	}

	public async createWIPFormByInviteID(r: db.CreateWIPFormRequest): Promise<db.WIPForm> {
		const wipFormKey = this.key(KvCollection.WIP_FORM_BY_INVITE_ID, r.inviteID);
		const wipForm: db.WIPForm = {
			form: r.form,
			user: r.user
		};
		const result = await this.kv.atomic().set(wipFormKey, wipForm).commit();
		if (!result.ok) {
			throw new Error('Failed to create WIP form.');
		}
		return wipForm;
	}

	public async deleteWIPFormByInviteID(id: string): Promise<void> {
		const wipFormKey = this.key(KvCollection.WIP_FORM_BY_INVITE_ID, id);
		const wipFormResult = await this.kv.get<db.WIPForm>(wipFormKey);
		if (!wipFormResult.value) {
			throw new Error(`WIP form not found for invite ID: ${id}`);
		}
		const result = await this.kv.atomic().check(wipFormResult).delete(wipFormKey).commit();
		if (!result.ok) {
			throw new Error('Failed to delete WIP form.');
		}
	}

	public async saveWIPForm(id: string, r: db.WIPForm): Promise<void> {
		const wipFormKey = this.key(KvCollection.WIP_FORM_BY_INVITE_ID, id);
		const wipFormResult = await this.kv.get<db.WIPForm>(wipFormKey);
		if (!wipFormResult.value) {
			throw new Error(`WIP form not found for invite ID: ${id}`);
		}
		const result = await this.kv.atomic().check(wipFormResult).set(wipFormKey, r).commit();
		if (!result.ok) {
			throw new Error('Failed to save WIP form.');
		}
	}

	private key(...key: KvKey) {
		return [...this.kvNamespace, ...key];
	}
}
