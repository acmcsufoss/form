import type { LayoutServerLoad } from './$types';
import { s } from '$lib/resources/store';
import { SESSION_ID_COOKIE_NAME } from '$lib/oauth2';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const session = cookies.get(SESSION_ID_COOKIE_NAME);
	if (!session) {
		return;
	}

	const user = await s.getUserBySessionID(session);
	console.log({ session, user });
	if (!user) {
		return;
	}

	locals.user = user;
};
