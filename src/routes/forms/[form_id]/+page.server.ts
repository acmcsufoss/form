import type { PageServerLoad } from './$types';
import { s } from '$lib/resources/store';

export const load: PageServerLoad = async ({ locals, params }) => {
	const form = await s.getFormByID(params.form_id);
	return {
		form,
		user: locals.user
	};
};
