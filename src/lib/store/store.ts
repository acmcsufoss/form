import type { Form } from '$lib/form';

export type { Form };

export type ID = string;

export interface Submission {
	id: ID;
	formID: ID;
	userID: ID;

	data: Record<string, unknown>;

	/**
	 * submissionDatetime is the submission time in milliseconds since the Unix epoch.
	 */
	submitDatetime: number;
}

export interface User {
	id: ID;
	discordUserID: ID;
	discordUsername: string;
	discordAvatar: string;
}

export interface CreateSessionRequest {
	sessionID: ID;
	discordUserID: ID;
	discordUsername: string;
	discordAvatar: string;
}

export interface CreateUserRequest {
	sessionID: ID;
	discordUserID: ID;
	discordUsername: string;
	discordAvatar: string;
}

export interface Store {
	createForm(form: Form): Promise<Form>;
	createSession(r: CreateSessionRequest): Promise<User>;
	createSubmission(submission: Submission): Promise<Submission>;
	createUser(r: CreateUserRequest): Promise<User>;
	getFormByID: (id: ID) => Promise<Form | null>;
	getSubmissionByID: (id: ID) => Promise<Submission | null>;
	getUserByDiscordUserID: (id: ID) => Promise<User | null>;
	getUserBySessionID: (id: ID) => Promise<User | null>;
}
