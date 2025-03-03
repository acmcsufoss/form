import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { makeOAuth2URL } from '$lib/oauth2';

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

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		throw redirect(303, makeOAuth2URL(url.toString()));
	}
};
