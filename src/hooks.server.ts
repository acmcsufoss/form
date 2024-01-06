import type { Handle } from '@sveltejs/kit';
import { s } from '$lib/resources/store';
import { SESSION_ID_COOKIE_NAME } from '$lib/session';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionID = event.cookies.get(SESSION_ID_COOKIE_NAME);
	if (sessionID) {
		const user = await s.getUserBySessionID(sessionID);
		if (user) {
			event.locals.user = user;
		}
	}

	return await resolve(event);
};
