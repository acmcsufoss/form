import type { Kv, KvKey } from '@deno/kv';
import type * as store from '$lib/store';

export enum KvCollection {
	USERS_BY_DISCORD_USER_ID = 'users_by_discord_user_id',
	USERS_BY_SESSION_ID = 'users_by_session_id',
	FORMS_BY_ID = 'forms_by_id',
	SUBMISSIONS_BY_ID = 'submissions_by_id',
	SUBMISSIONS_BY_FORM_ID = 'submissions_by_form_id'
}

export class KvStore implements store.Store {
	constructor(private readonly kv: Kv, private readonly kvNamespace: KvKey = []) {}

	public async getForms(): Promise<store.Form[]> {
		const prefix = this.key(KvCollection.FORMS_BY_ID);
		const forms: store.Form[] = [];
		for await (const entry of this.kv.list<store.Form>({ prefix })) {
			forms.push(entry.value);
		}

		return forms;
	}

	public async getFormByID(id: string): Promise<store.Form | null> {
		const formKey = this.key(KvCollection.FORMS_BY_ID, id);
		const formResult = await this.kv.get<store.Form>(formKey);
		return formResult.value;
	}

	public async getUserByDiscordUserID(id: string) {
		const userKey = this.key(KvCollection.USERS_BY_DISCORD_USER_ID, id);
		const userResult = await this.kv.get<store.User>(userKey);
		return userResult.value;
	}

	public async getUserBySessionID(id: string): Promise<store.User | null> {
		const userKey = this.key(KvCollection.USERS_BY_SESSION_ID, id);
		const userResult = await this.kv.get<store.User>(userKey);
		return userResult.value;
	}

	public async getSubmissionByID(id: string): Promise<store.Submission | null> {
		const submissionKey = this.key(KvCollection.SUBMISSIONS_BY_ID, id);
		const submissionResult = await this.kv.get<store.Submission>(submissionKey);
		return submissionResult.value;
	}

	public async getSubmissionsByFormID(id: string): Promise<store.Submission[]> {
		const prefix = this.key(KvCollection.SUBMISSIONS_BY_FORM_ID, id);
		const submissions: store.Submission[] = [];
		for await (const entry of this.kv.list<store.Submission>({ prefix })) {
			submissions.push(entry.value);
		}

		return submissions;
	}

	public async createForm(r: store.CreateFormRequest): Promise<store.Form> {
		const formKey = this.key(KvCollection.FORMS_BY_ID, r.id);
		await this.kv.set(formKey, r);
		return r;
	}

	public async createUser(r: store.CreateUserRequest): Promise<store.User> {
		const id: store.ID = crypto.randomUUID();
		const user: store.User = {
			id,
			discordUserID: r.discordUserID,
			discordUsername: r.discordUsername,
			discordAvatar: r.discordAvatar
		};

		const usersByDiscordUserIDKey = this.key(
			KvCollection.USERS_BY_DISCORD_USER_ID,
			r.discordUserID
		);
		const usersBySessionIDKey = this.key(KvCollection.USERS_BY_SESSION_ID, r.sessionID);
		const result = await this.kv
			.atomic()
			// I thought this check was necessary, but it causes an error.
			// .check({ key: usersByDiscordUserIDKey, versionstamp: null })
			.set(usersByDiscordUserIDKey, user)
			.set(usersBySessionIDKey, user)
			.commit();
		if (!result.ok) {
			throw new Error('Failed to create user.');
		}

		return user;
	}

	public async createSession(r: store.CreateSessionRequest): Promise<store.User> {
		const usersByDiscordUserIDKey = this.key(
			KvCollection.USERS_BY_DISCORD_USER_ID,
			r.discordUserID
		);
		const userResult = await this.kv.get<store.User>(usersByDiscordUserIDKey);
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
			.set(usersBySessionIDKey, updatedUser)
			.commit();
		if (!result.ok) {
			throw new Error('Failed to create session.');
		}

		return updatedUser;
	}

	public async createSubmission(r: store.CreateSubmissionRequest): Promise<store.Submission> {
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
		const submissionResult = await this.kv.get<store.Submission>(submissionsByIDKey);
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

	private key(...key: KvKey) {
		return [...this.kvNamespace, ...key];
	}
}
