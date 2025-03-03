import type { APIGuildMember, RESTPostAPIChannelMessageJSONBody } from 'discord-api-types/v10';

export const API_URL = 'https://discord.com/api';

export interface GetGuildMemberRequest {
	guildID: string;
	userID: string;
	botToken: string;
}

function makeGetGuildMemberURL(r: GetGuildMemberRequest, apiURL = API_URL): string {
	return `${apiURL}/guilds/${r.guildID}/members/${r.userID}`;
}

export async function getGuildMember(r: GetGuildMemberRequest): Promise<APIGuildMember> {
	const response = await fetch(makeGetGuildMemberURL(r), {
		headers: {
			Authorization: `Bot ${r.botToken}`
		}
	});
	if (!response.ok) {
		throw new Error(`Failed to get guild member: ${response.status} ${response.statusText}`);
	}

	return await response.json();
}

export interface CheckGuildMemberHasRoleRequest extends GetGuildMemberRequest {
	roleID: string;
}

export async function checkGuildMemberHasRole(r: CheckGuildMemberHasRoleRequest): Promise<boolean> {
	const member = await getGuildMember(r);
	return member.roles.includes(r.roleID);
}

export interface CreateMessageRequest {
	body: RESTPostAPIChannelMessageJSONBody;
	channelID: string;
	botToken: string;
}

function makeCreateMessageURL(r: CreateMessageRequest, apiURL = API_URL): string {
	return `${apiURL}/channels/${r.channelID}/messages`;
}

// https://discord.com/developers/docs/resources/channel#create-message
export async function createMessage(r: CreateMessageRequest): Promise<APIGuildMember> {
	const response = await fetch(makeCreateMessageURL(r), {
		method: 'POST',
		headers: {
			Authorization: `Bot ${r.botToken}`
		},
		body: JSON.stringify(r.body)
	});
	if (!response.ok) {
		throw new Error(`Failed to create message: ${response.statusText}`);
	}

	return await response.json();
}

export interface DiscordOAuth2URLData {
	clientID: string;
	redirectURI: string;
	state?: string;
	apiURL?: string;
}

export function makeOAuth2URL(data: DiscordOAuth2URLData) {
	const url = new URL(`${data.apiURL || API_URL}/oauth2/authorize`);
	url.searchParams.set('client_id', data.clientID);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('redirect_uri', data.redirectURI);
	url.searchParams.set('scope', 'identify');
	url.searchParams.set('state', data.state || '');
	return url.toString();
}

// https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-exchange-example
export interface AccessTokenRequest {
	clientID: string;
	clientSecret: string;
	code: string;
	redirectURI: string;
}

// https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response
export interface AccessTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}

export async function exchangeCode(
	r: AccessTokenRequest,
	apiURL = API_URL
): Promise<AccessTokenResponse> {
	const response = await fetch(`${apiURL}/oauth2/token`, {
		method: 'POST',
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code: r.code,
			redirect_uri: r.redirectURI
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept-Encoding': 'application/x-www-form-urlencoded',
			Authorization: makeAuthorizationHeader(r.clientID, r.clientSecret)
		}
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
}

export function makeAuthorizationHeader(clientID: string, clientSecret: string) {
	return `Basic ${btoa(`${clientID}:${clientSecret}`)}`;
}

export interface DiscordUser {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	flags: number;
}

export async function getDiscordUser(accessToken: string, apiURL = API_URL): Promise<DiscordUser> {
	const response = await fetch(`${apiURL}/users/@me`, {
		headers: { Authorization: `Bearer ${accessToken}` }
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
}

export async function getDiscordUserFromCode(r: AccessTokenRequest): Promise<DiscordUser> {
	// Exchange code for token.
	const accessTokenResponse = await exchangeCode(r);

	// Get user info from Discord.
	return await getDiscordUser(accessTokenResponse.access_token);
}
