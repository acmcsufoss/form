export const SESSION_ID_COOKIE_NAME = 'session_id';

export function makeOAuth2URL(destination: string) {
	const state = JSON.stringify({ destination });
	const search = new URLSearchParams({ state }).toString();
	return `/discord_oauth2?${search}`;
}
