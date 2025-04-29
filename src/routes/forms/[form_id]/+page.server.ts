import type { PageServerLoad, Actions } from './$types';
import type { Form } from '$lib/form/form';
import { FormSchema } from '$lib/form/formSchema';
import { s } from '$lib/resources/store';
import qs from 'qs';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const form = await s.getFormByID(params.form_id);
	return {
		form,
		user: locals.user
	};
};

export const actions: Actions = {
	parse: async ({ request }) => {
		const formData = await request.formData();
		console.log(parseFormData(formData));
		// const rawBody = await request.text();
		// console.log(rawBody);
		// const parsedBody = qs.parse(rawBody, { allowEmptyArrays: true });
		// console.log(parsedBody.form);
		// const form: Form = FormSchema.parse(parsedBody.form);
		// console.log(form);
		return { success: true };
	},
	save: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = parseFormData(formData);
		const user = locals.user;
		if (!user) {
			return { success: false, error: 'User not found' };
		}
		// TODO: Check if the user has permission to edit the form.
		await s.saveFormEditor(form);
		return { success: true };
	},
	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = parseFormData(formData);
		const user = locals.user;
		if (!user) {
			return { success: false, error: 'User not found' };
		}

		await s.deleteFormEditor(form);
		throw redirect(303, '/forms');
	},
	testActivate: async ({ request }) => {
		// TODO: Check if the user has permission to edit the form.
		const formData = await request.formData();
		const form = parseFormData(formData);
		await s.activateForm(form);
		return { success: true };
	}
};

function parseFormData(formData: FormData): Form {
	const flat = Object.fromEntries(formData.entries());
	const parsedBody = qs.parse(qs.stringify(flat), { allowEmptyArrays: true });
	const form = FormSchema.parse(parsedBody.form);
	return form;
}
