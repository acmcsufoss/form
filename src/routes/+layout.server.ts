import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
	const session = cookies.get('session');
	const destination = url.toString();
	if (!session) {
		throw redirect(303, makeRedirectURL(destination));
	}

	const { email } = JSON.parse(session);
	if (!email) {
		throw redirect(303, makeRedirectURL(destination));
	}

	return {};
};

function makeRedirectURL(destination: string) {
	return `/discord_oauth2?destination=${encodeURIComponent(destination)}`;
}
