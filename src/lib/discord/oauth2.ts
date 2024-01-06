export const API_URL = 'https://discord.com/api';

export function makeOAuth2URL(clientID: string, redirectURI: string, apiURL = API_URL) {
	const url = new URL(`${apiURL}/oauth2/authorize`);
	url.searchParams.set('client_id', clientID);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('redirect_uri', redirectURI);
	url.searchParams.set('scope', 'identify');
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
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
}

export interface RefreshTokenRequest {
	clientID: string;
	clientSecret: string;
	refreshToken: string;
}

export async function refreshToken(
	r: RefreshTokenRequest,
	apiURL = API_URL
): Promise<AccessTokenResponse> {
	const response = await fetch(`${apiURL}/oauth2/token`, {
		method: 'POST',
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: r.refreshToken
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

export interface RevokeTokenRequest {
	clientID: string;
	clientSecret: string;
	token: string;
}

export async function revokeToken(r: RevokeTokenRequest, apiURL = API_URL): Promise<void> {
	const response = await fetch(`${apiURL}/oauth2/token/revoke`, {
		method: 'POST',
		body: new URLSearchParams({
			token: r.token,
			token_type_hint: 'access_token'
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: makeAuthorizationHeader(r.clientID, r.clientSecret)
		}
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return;
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
