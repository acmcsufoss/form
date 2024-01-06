export type ID = string;

export interface User {
	id: ID;
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
	getUserByDiscordUserID: (id: ID) => Promise<User | null>;
	getUserBySessionID: (id: ID) => Promise<User | null>;
	createUser(r: CreateUserRequest): Promise<User>;
}
