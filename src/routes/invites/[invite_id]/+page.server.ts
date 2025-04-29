import type { PageServerLoad, Actions } from './$types';
import { s } from '$lib/resources/store';

export const load: PageServerLoad = async ({ params }) => {
	const invite_id = params.invite_id;
	// const WIPForm = await s.getInviteByID(invite_id);

	const WIPForm = await s.getWIPFormByInviteID(invite_id);
	const form_id = WIPForm?.form.id;

	// TODO: create a way of updating a form when it is updated with new questions.
	// Saving drafts of forms.
	if (!form_id) {
		return {
			status: 404,
			error: new Error('Form not found')
		};
	}
	const form = await s.getFormByID(form_id);
	if (!WIPForm) {
		return {
			status: 404,
			error: new Error('Invite not found')
		};
	}
	return {
		form: form,
		user: WIPForm.user
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		console.log('Test submit');
	}
};
