import type { RequestHandler } from './$types';
import { ulid } from 'ulid';
import { s } from '$lib/resources/store';
import { makeFormURL } from '$lib/urls';

export const GET: RequestHandler = async () => {
	// Create a new empty form.
	const form = await createEmptyForm();

	// Redirect to the new form.
	return new Response(null, {
		status: 303,
		headers: {
			Location: makeFormURL(form.id)
		}
	});
};

async function createEmptyForm() {
	return await s.createForm({
		id: ulid(),
		discordChannelID: '',
		startDate: '',
		endDate: null,
		questions: {
			shuffled: false,
			data: []
		}
	});
}
