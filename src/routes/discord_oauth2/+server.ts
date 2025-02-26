import type { RequestHandler } from './$types';
import type * as db from '$lib/db';
import {
	DISCORD_REDIRECT_URI,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_GUILD_ID,
	DISCORD_ROLE_ID,
	DISCORD_BOT_TOKEN
} from '$env/static/private';
import { SESSION_ID_COOKIE_NAME } from '$lib/oauth2';
import { s } from '$lib/resources/store';
import {
	makeOAuth2URL,
	getDiscordUserFromCode,
	checkGuildMemberHasRole,
	type DiscordUser
} from '$lib/discord';

export const GET: RequestHandler = async ({ url, locals }) => {
	// Decode the state.
	const state = JSON.parse(url.searchParams.get('state') || '{}');
	const redirect = makeRedirect(state.destination || '/');

	// Check if user is already logged in.
	if (locals.user) {
		return redirect;
	}

	// Check if the user has a code.
	const code = url.searchParams.get('code');
	if (!code) {
		// Redirect to Discord OAuth2 URL.
		return makeRedirect(
			makeOAuth2URL({
				clientID: DISCORD_CLIENT_ID,
				redirectURI: DISCORD_REDIRECT_URI,
				state: JSON.stringify({ destination: state.destination })
			})
		);
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

	// Check if user has the required role.
	if (DISCORD_GUILD_ID && DISCORD_ROLE_ID) {
		const hasRole = await checkGuildMemberHasRole({
			botToken: DISCORD_BOT_TOKEN,
			guildID: DISCORD_GUILD_ID,
			roleID: DISCORD_ROLE_ID,
			userID: discordUser.id
		});
		if (!hasRole) {
			throw new Error('User does not have the required role.');
		}
	}

	// Make a session ID.
	const sessionID = crypto.randomUUID();
	const query = fromDiscordUser(sessionID, discordUser);

	// If user does not exist, create user.
	// Otherwise, create session for user.
	const user = await s.getUserByDiscordUserID(discordUser.id);
	await (user !== null ? s.createSession(query) : s.createUser(query));

	// Set session cookie with 1 week expiry.
	// Redirect the user to their destination.
	redirect.headers.set(
		'Set-Cookie',
		`${SESSION_ID_COOKIE_NAME}=${sessionID}; HttpOnly; Max-Age=${60 * 60 * 24 * 7}`
	);
	return redirect;
};

function fromDiscordUser(sessionID: string, discordUser: DiscordUser): db.CreateUserRequest {
	return {
		sessionID,
		discordUserID: discordUser.id,
		discordUsername: discordUser.username,
		discordAvatar: discordUser.avatar
	};
}

function makeRedirect(destination: string, headers = new Headers()) {
	headers.set('Location', destination);
	return new Response(null, { status: 302, headers });
}
