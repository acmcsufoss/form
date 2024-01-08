import type { PageServerLoad } from './$types';
import { s } from '$lib/resources/store';

export const load: PageServerLoad = async ({ locals, params }) => {
	const form = await s.getFormByID(params.id);
	return {
		user: locals.user
	};
};
