import type { PageServerLoad } from './$types';
import { s } from '$lib/resources/store';

export const load: PageServerLoad = async ({ locals, params }) => {
	const submission = await s.getSubmissionByID(params.submission_id);
	return {
		submission,
		user: locals.user
	};
};
