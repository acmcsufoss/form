import type { Form } from '$lib/form';

export type { Form };

export type ID = string;

export interface Submission {
	id: ID;
	formID: ID;
	userID: ID;
	data: Record<string, unknown>;

	/**
	 * submittedAt is the submission timestamp in milliseconds since the Unix epoch.
	 *
	 * If submittedAt is null, the submission is a draft.
	 */
	submittedAt: number | null;
}

export interface User {
	id: ID;
	discordUserID: ID;
	discordUsername: string;
	discordAvatar: string;
}

export type CreateFormRequest = Form;

export interface CreateSessionRequest {
	sessionID: ID;
	discordUserID: ID;
	discordUsername: string;
	discordAvatar: string;
}

export type CreateSubmissionRequest = Submission;

export interface CreateUserRequest {
	sessionID: ID;
	discordUserID: ID;
	discordUsername: string;
	discordAvatar: string;
}

export interface saveFormRequest {
	form: Form;
	user: ID;
}

export interface Store {
	createForm(r: CreateFormRequest): Promise<Form>;
	createSession(r: CreateSessionRequest): Promise<User>;
	createSubmission(r: CreateSubmissionRequest): Promise<Submission>;
	createUser(r: CreateUserRequest): Promise<User>;
	deleteFormByID(id: ID): Promise<void>;
	deleteSessionByID(id: ID): Promise<void>;
	deleteSubmissionByID(id: ID): Promise<void>;
	getFormByID(id: ID): Promise<Form | null>;
	getFormByUserID(id: ID): Promise<Form[]>;
	getForms(): Promise<Form[]>;
	getSubmissionByID(id: ID): Promise<Submission | null>;
	getSubmissionsByFormID(id: ID): Promise<Submission[]>;
	getUserByDiscordUserID(id: ID): Promise<User | null>;
	getUserBySessionID(id: ID): Promise<User | null>;
	saveFormEditor(r: saveFormRequest): Promise<Form>;
}
