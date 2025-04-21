import type { PageServerLoad } from './$types';
import { s } from '$lib/resources/store';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	const forms = await s.getFormByUserID(user.id);
	return {
		forms,
		user: locals.user
	};
};
