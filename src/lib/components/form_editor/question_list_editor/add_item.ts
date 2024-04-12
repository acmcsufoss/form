import type { QuestionBase, QuestionType } from '$lib/form';

export function makeBlankQuestion(type: QuestionType): QuestionBase {
	return {
		type,
		name: '',
		content: 'No content.',
		required: false
	};
}
