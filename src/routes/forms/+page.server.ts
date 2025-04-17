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

async function getFormsByUser() {
	// TODO: Get forms by user.
	return await s.getForms();
}
