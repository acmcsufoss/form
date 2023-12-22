import type { RequestHandler } from './$types';
import * as jose from 'jose';
import { openKv } from '@deno/kv';
import { KvStore } from '$lib/store/kv';
import {
	DISCORD_REDIRECT_URI,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	JWT_SECRET
} from '$env/static/private';
import { makeOAuth2URL, exchangeCode, getDiscordUser, refreshToken } from '$lib/discord/oauth2';

async function init() {
	const kv = await openKv('./db.kv');
	const s = new KvStore(kv);
	const jwtSecret = new TextEncoder().encode(JWT_SECRET);
	return { kv, s, jwtSecret };
}

async function signJWT(
	payload: jose.JWTPayload,
	secret: jose.KeyLike | Uint8Array
): Promise<string> {
	return await new jose.SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('2h')
		.sign(secret);
}

export const GET: RequestHandler = async ({ url }) => {
	// Initialize resources.
	const { s, jwtSecret } = await init();

	// Initialize headers.
	const headers = new Headers();

	// Check if the user has a code.
	const code = url.searchParams.get('code');
	if (code) {
		// Exchange code for token.
		const accessTokenResponse1 = await exchangeCode({
			clientID: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET,
			code,
			redirectURI: DISCORD_REDIRECT_URI
		});
		console.log(accessTokenResponse1);

		// Refresh token if expired.
		if (accessTokenResponse1.expires_in <= 0) {
			const accessTokenResponse2 = await refreshToken({
				clientID: DISCORD_CLIENT_ID,
				clientSecret: DISCORD_CLIENT_SECRET,
				refreshToken: accessTokenResponse1.refresh_token
			});
			console.log(accessTokenResponse2);
		}

		// Get user info from Discord.
		const discordUser = await getDiscordUser(accessTokenResponse1.access_token);

		// Check if user exists in database. Otherwise, check if user is in the guild.
		const user = await s.getUserByDiscordUserID({ discordUserID: discordUser.id });

		// TODO: Set JWT cookie with access token.
	}

	// Redirect to Discord OAuth2 URL.
	headers.set('Location', makeOAuth2URL(DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI));
	return new Response(null, { status: 302, headers });
};
