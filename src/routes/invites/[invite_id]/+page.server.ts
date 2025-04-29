import type { PageServerLoad, Actions } from './$types';
import { s } from '$lib/resources/store';
// import type { Submission } from '$lib/form';
import { parse } from '$lib/form/submission';
// import { redirect } from '@sveltejs/kit';

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
		const invite_id = params.invite_id;
		const formData = await request.formData();
		const WIPForm = await s.getWIPFormByInviteID(invite_id);
		if (!WIPForm) {
			return { success: false, error: 'Invite not found' };
		}

		const formSchema = await s.getFormByID(WIPForm.form.id);
		if (!formSchema) {
			return { success: false, error: 'Form not found' };
		}

		const parsedBody = parse(formSchema, formData);
		// TODO create submission and save it to the database.
		console.log('Test submit');
		console.log(parsedBody);
	}
};
