import type { Form } from "$lib/form";

export type ID = string;

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
	createSession(r: CreateSessionRequest): Promise<User>;
	createUser(r: CreateUserRequest): Promise<User>;
	getFormByID: (id: ID) => Promise<Form | null>;
	getUserByDiscordUserID: (id: ID) => Promise<User | null>;
	getUserBySessionID: (id: ID) => Promise<User | null>;
}
