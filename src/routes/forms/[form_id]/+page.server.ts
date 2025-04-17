import type { PageServerLoad, Actions } from './$types';
import type { Form } from '$lib/form/form';
import { FormSchema } from '$lib/form/formSchema';
import { s } from '$lib/resources/store';
import qs from 'qs';

export const load: PageServerLoad = async ({ locals, params }) => {
	const form = await s.getFormByID(params.form_id);
	return {
		form,
		user: locals.user
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const rawBody = await request.text();
		const parsedBody = qs.parse(rawBody, { allowEmptyArrays: true });
		const form: Form = FormSchema.parse(parsedBody.form);
		console.log(form);
		return { success: true };
	}
};
