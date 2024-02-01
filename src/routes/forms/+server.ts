import type { RequestHandler } from './$types';

// TODO: Update/delete a form.
// TODO: Add/remove a user as a collaborator to a form.
// TODO: Add submission to a form.

// import type { RequestHandler } from './$types';
// import { ulid } from 'ulid';
// import { s } from '$lib/resources/store';
// import { makeFormURL } from '$lib/urls';

// export const GET: RequestHandler = async () => {
// 	// Get list of forms.
// 	const form = await createEmptyForm();

// 	// Redirect to the new form.
// 	return new Response(null, {
// 		status: 303,
// 		headers: {
// 			Location: makeFormURL(form.id)
// 		}
// 	});
// };

// async function getUserForms() {
// 	return await s.createForm({
// 		id: ulid(),
// 		questions: {
// 			shuffled: false,
// 			data: []
// 		}
// 	});
// }
