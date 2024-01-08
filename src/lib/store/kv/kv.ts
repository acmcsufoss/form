import type { Kv, KvKey } from '@deno/kv';
import type * as store from '$lib/store';

export enum KvCollection {
	USERS_BY_DISCORD_USER_ID = 'users_by_discord_user_id',
	USERS_BY_SESSION_ID = 'users_by_session_id',
	FORMS_BY_ID = 'forms_by_id',
	SUBMISSIONS_BY_ID = 'submissions_by_id'
}

export class KvStore implements store.Store {
	constructor(private readonly kv: Kv, private readonly kvNamespace: KvKey = []) {}

	public async createForm(form: store.Form): Promise<store.Form> {
		const id = crypto.randomUUID();
		const formKey = this.k(KvCollection.FORMS_BY_ID, id);
		await this.kv.set(formKey, form);
		return { ...form, id };
	}

	public async createSession(r: store.CreateSessionRequest): Promise<store.User> {
		const usersByDiscordUserIDKey = this.k(KvCollection.USERS_BY_DISCORD_USER_ID, r.discordUserID);
		const userResult = await this.kv.get<store.User>(usersByDiscordUserIDKey);
		if (!userResult.value) {
			throw new Error(`User not found for discordUserID: ${r.discordUserID}`);
		}

		const updatedUser = {
			...userResult.value,
			discordUsername: r.discordUsername,
			discordAvatar: r.discordAvatar
		};

		const usersBySessionIDKey = this.k(KvCollection.USERS_BY_SESSION_ID, r.sessionID);
		await this.kv
			.atomic()
			.check(userResult)
			.set(usersByDiscordUserIDKey, updatedUser)
			.set(usersBySessionIDKey, updatedUser)
			.commit();

		return updatedUser;
	}

	public async createUser(r: store.CreateUserRequest): Promise<store.User> {
		const id: store.ID = crypto.randomUUID();
		const user: store.User = {
			id,
			discordUserID: r.discordUserID,
			discordUsername: r.discordUsername,
			discordAvatar: r.discordAvatar
		};

		// https://docs.deno.com/kv/manual/secondary_indexes#non-unique-indexes-one-to-many
		const usersByDiscordUserIDKey = this.k(KvCollection.USERS_BY_DISCORD_USER_ID, r.discordUserID);
		const usersBySessionIDKey = this.k(KvCollection.USERS_BY_SESSION_ID, r.sessionID);
		await this.kv
			.atomic()
			.check({ key: usersByDiscordUserIDKey, versionstamp: null })
			.set(usersByDiscordUserIDKey, user)
			.set(usersBySessionIDKey, user)
			.commit();

		return user;
	}

	public async createSubmission(submission: store.Submission): Promise<store.Submission> {
		const id = crypto.randomUUID();
		const submissionKey = this.k(KvCollection.SUBMISSIONS_BY_ID, id);
		await this.kv.set(submissionKey, submission);
		return { ...submission, id };
	}

	public async getFormByID(id: string): Promise<store.Form | null> {
		const formKey = this.k(KvCollection.FORMS_BY_ID, id);
		const formResult = await this.kv.get<store.Form>(formKey);
		return formResult.value;
	}

	public async getSubmissionByID(id: string): Promise<store.Submission | null> {
		const submissionKey = this.k(KvCollection.SUBMISSIONS_BY_ID, id);
		const submissionResult = await this.kv.get<store.Submission>(submissionKey);
		return submissionResult.value;
	}

	public async getUserByDiscordUserID(id: string) {
		const userKey = this.k(KvCollection.USERS_BY_DISCORD_USER_ID, id);
		const userResult = await this.kv.get<store.User>(userKey);
		return userResult.value;
	}

	public async getUserBySessionID(id: string): Promise<store.User | null> {
		const userKey = this.k(KvCollection.USERS_BY_SESSION_ID, id);
		const userResult = await this.kv.get<store.User>(	userKey);
		return userResult.value;
	}

	private k(...key: KvKey) {
		return [...this.kvNamespace, ...key];
	}
}
