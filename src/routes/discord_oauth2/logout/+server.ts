import type { RequestHandler } from './$types';
import { SESSION_ID_COOKIE_NAME } from '$lib/oauth2';
import { s } from '$lib/resources/store';

export const GET: RequestHandler = async ({ cookies, url }) => {
	const redirectURL = url.searchParams.get('destination') || '/';
	const sessionID = cookies.get(SESSION_ID_COOKIE_NAME);
	if (!sessionID) {
		return makeRedirect('Already logged out.', redirectURL);
	}

	const user = await s.getUserBySessionID(sessionID);
	if (!user) {
		return makeRedirect('Already logged out.', redirectURL);
	}

	await s.deleteSessionByID(sessionID);
	return makeRedirect('Logged out.', '/');
};

function makeRedirect(message: string, destination: string) {
	return new Response(message, {
		status: 302,
		headers: {
			Location: destination
		}
	});
}
