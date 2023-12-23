import type { PageServerLoad } from './$types';
import { DISCORD_REDIRECT_URI, DISCORD_CLIENT_ID } from '$env/static/private';

export const load: PageServerLoad = async () => {
	const oauth2URL = makeOAuth2URL(DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI);
	return Response.redirect(oauth2URL, 302);
};

function makeOAuth2URL(clientID: string, redirectURI: string) {
	const url = new URL('https://discord.com/api/oauth2/authorize');
	url.searchParams.set('client_id', clientID);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('redirect_uri', redirectURI);
	url.searchParams.set('scope', 'identify');
	return url.toString();
}
