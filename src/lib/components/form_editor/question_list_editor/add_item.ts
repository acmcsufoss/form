import { QuestionType } from '$lib/form';
import type { Question } from '$lib/form/form';

export function makeBlankQuestion(type: QuestionType): Question {
	switch (type) {
		case QuestionType.RADIO_GROUP:
			return {
				type,
				name: '',
				content: 'No content.',
				choices: []
			};
		case QuestionType.SELECT:
			return {
				type,
				name: '',
				content: 'No content.',
				options: []
			};
		default:
			return {
				type,
				name: '',
				content: 'No content.'
			};
	}
}
