export interface GetUserByDiscordUserIDRequest {
	discordUserID: string;
}

export interface User {
	id: string;
	discordUserID: string;
	discordUsername: string;
	discordAvatar: string;
}

export interface Store {
	getUserByDiscordUserID: (r: GetUserByDiscordUserIDRequest) => Promise<User>;
}
