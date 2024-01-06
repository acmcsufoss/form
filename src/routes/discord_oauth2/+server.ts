import type { RequestHandler } from './$types';
import {
	DISCORD_REDIRECT_URI,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET
} from '$env/static/private';
import { SESSION_ID_COOKIE_NAME } from '$lib/session';
import { s } from '$lib/resources/store';
import { makeOAuth2URL, getDiscordUserFromCode } from '$lib/discord/oauth2';

export const GET: RequestHandler = async ({ url, locals }) => {
	// Check if user is already logged in.
	if (locals.user) {
		return makeRedirect(url.searchParams.get('destination') || '/');
	}

	// Check if the user has a code.
	const code = url.searchParams.get('code');
	if (!code) {
		// Redirect to Discord OAuth2 URL.
		return makeRedirect(makeOAuth2URL(DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI));
	}

	// Get Discord user from code.
	const discordUser = await getDiscordUserFromCode({
		code,
		clientID: DISCORD_CLIENT_ID,
		clientSecret: DISCORD_CLIENT_SECRET,
		redirectURI: DISCORD_REDIRECT_URI
	});
	if (!discordUser) {
		throw new Error('Failed to get user from code.');
	}

	// Make a session ID.
	const sessionID = crypto.randomUUID(); // TODO: Hash Discord user ID + secret token.

	// If user does not exist, create user.
	const user = await s.getUserByDiscordUserID(discordUser.id);
	if (!user) {
		await s.createUser({
			sessionID,
			discordUserID: discordUser.id,
			discordUsername: discordUser.username,
			discordAvatar: discordUser.avatar
		});
	}

	// Set session cookie with 1 week expiry.
	const headers = new Headers();
	headers.set(
		'Set-Cookie',
		`${SESSION_ID_COOKIE_NAME}=${sessionID}; HttpOnly; Max-Age=${60 * 60 * 24 * 7}`
	);

	// Redirect the user to their destination.
	return makeRedirect(url.searchParams.get('destination') || '/', headers);
};

function makeRedirect(destination: string, headers = new Headers()) {
	headers.set('Location', destination);
	return new Response(null, { status: 302, headers });
}
