import type { RequestHandler } from './$types';
import { ulid } from 'ulid';
import { s } from '$lib/resources/store';
import { makeSubmissionURL } from '$lib/urls';

export const GET: RequestHandler = async ({ params, locals }) => {
	// Create a new empty submission.
	if (!locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const submission = await createEmptySubmission(locals.user?.id, params.form_id);

	// Redirect to the new form.
	return new Response(null, {
		status: 303,
		headers: {
			Location: makeSubmissionURL(params.form_id, submission.id)
		}
	});
};

async function createEmptySubmission(userID: string, formID: string) {
	// TODO: Throw an error if the form does not exist.
	// TODO: Throw an error if the user has already submitted the form.
	return await s.createSubmission({
		id: ulid(),
		formID,
		userID,
		data: {},
		submittedAt: null
	});
}
