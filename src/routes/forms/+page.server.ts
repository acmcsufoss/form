import type { PageServerLoad } from './$types';
import { s } from '$lib/resources/store';

export const load: PageServerLoad = async ({ locals }) => {
	const forms = await s.getForms();
	return {
		forms,
		user: locals.user
	};
};
