import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { s } from '$lib/resources/store';
import { SESSION_ID_COOKIE_NAME } from '$lib/session';

// Note:
//
// > In SvelteKit 1.x you had to throw the redirect yourself
//
// Usage of the following redirect pattern is not using the `throw new Error`
// pattern because it is not supported by the SvelteKit compiler.
//
// ```ts
// redirect(303, '/login');
// return;
// ```
//

export const load: LayoutServerLoad = async ({ url, cookies, locals }) => {
	const session = cookies.get(SESSION_ID_COOKIE_NAME);
	const destination = url.toString();
	if (!session) {
		redirect(303, makeOAuth2URL(destination));
		return;
	}

	const user = await s.getUserBySessionID(session);
	if (!user) {
		redirect(303, makeOAuth2URL(destination));
		return;
	}

	locals.user = user;
};

function makeOAuth2URL(destination: string) {
	const state = JSON.stringify({ destination });
	const search = new URLSearchParams({ state }).toString();
	return `/discord_oauth2?${search}`;
}
