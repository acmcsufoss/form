import type { RequestHandler } from './$types';
import { ulid } from 'ulid';
import { s } from '$lib/resources/store';

export const GET: RequestHandler = async () => {
	// Create a new empty form.
	const form = await createEmptyForm();

	// Redirect to the new form.
	return new Response(null, {
		status: 303,
		headers: {
			Location: `/forms/${form.id}`
		}
	});
};

async function createEmptyForm() {
	return await s.createForm({
		id: ulid(),
		questions: {
			shuffled: false,
			data: []
		}
	});
}
