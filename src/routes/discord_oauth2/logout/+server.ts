import type { RequestHandler } from './$types';
import { SESSION_ID_COOKIE_NAME } from '$lib/oauth2';
import { s } from '$lib/resources/store';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionID = cookies.get(SESSION_ID_COOKIE_NAME);
	if (!sessionID) {
		return new Response('Already logged out.', { status: 400 });
	}

	const user = await s.getUserBySessionID(sessionID);
	if (!user) {
		return new Response('Already logged out.', { status: 400 });
	}

	await s.deleteSessionByID(sessionID);
	return new Response('Logged out.', { status: 200 });
};
