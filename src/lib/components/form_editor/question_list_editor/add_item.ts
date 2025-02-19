import { QuestionType } from '$lib/form';
import type { Question } from '$lib/form/form';
import { nanoid } from 'nanoid';

export function makeBlankQuestion(type: QuestionType): Question {
	const id = nanoid(5);

	switch (type) {
		case QuestionType.RADIO_GROUP:
			return {
				type,
				name: id,
				content: 'No content.',
				choices: []
			};
		case QuestionType.SELECT:
			return {
				type,
				name: id,
				content: 'No content.',
				options: []
			};
		default:
			return {
				type,
				name: id,
				content: 'No content.'
			};
	}
}
