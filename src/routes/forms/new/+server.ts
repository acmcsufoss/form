import type { RequestHandler } from './$types';
import { ulid } from 'ulid';
import { s } from '$lib/resources/store';
import { makeFormURL } from '$lib/urls';
import type { User } from '$lib/db/store';

export const GET: RequestHandler = async ({ locals }) => {
	// Create a new empty form.
	const user = locals.user as User;
	const form = await createEmptyForm(user);

	// Redirect to the new form.
	return new Response(null, {
		status: 303,
		headers: {
			Location: makeFormURL(form.id)
		}
	});
};

async function createEmptyForm(user: User) {
	return await s.createForm({
		id: ulid(),
		discordChannelID: '',
		permissions: {
			edit: { [user.id]: null }
		},
		startDate: '',
		endDate: null,
		questions: {
			shuffled: false,
			data: []
		}
	});
}
