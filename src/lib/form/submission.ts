import type { Form, ID, QuestionValue, Timestamp } from './form';
import { QuestionType } from './form';

/**
 * Submission is a form submission.
 */
export interface Submission {
	/**
	 * id is the ID of the submission.
	 */
	id: ID;

	/**
	 * formID is the ID of the form.
	 */
	formID: ID;

	/**
	 * userID is the ID of the Discord user that submitted the form.
	 */
	userID: ID;

	/**
	 * timestamp is the timestamp of the submission.
	 */
	timestamp: Timestamp;

	/**
	 * data is the submission data.
	 */
	data: QuestionValue[];
}

/**
 * parse parses a submission from a form data.
 */
export function parse(formSchema: Form, formData: FormData): QuestionValue[] {
	const data: QuestionValue[] = [];
	for (const question of formSchema.questions.data) {
		switch (question.type) {
			case QuestionType.TEXT: {
				const value = formData.get(question.name);
				data.push({
					type: question.type,
					name: question.name,
					value: typeof value === 'string' ? value : ''
				});
				break;
			}

            // TODO: implement other question types.

			default: {
				throw new Error('unimplemented');
			}
		}
	}

	return data;
}
