import type { ID } from './id';
import type {
	Form,
	QuestionValue,
	TextQuestionValue,
	TextareaQuestionValue,
	Timestamp,
	BooleanQuestionValue,
	RadioGroupQuestionValue,
	ColorQuestionValue,
	DateQuestionValue,
	TimeQuestionValue,
	DatetimeQuestionValue,
	NumberQuestionValue,
	AvailabilityQuestionValue
} from './form';
import { QuestionType, DEFAULT_MAX_DATE_RANGES } from './form';

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
	 * username is the username of the Discord user that submitted the form.
	 */
	username: string;

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
 * parse parses question values from a FormData object.
 */
export function parse(formSchema: Form, formData: FormData): QuestionValue[] {
	const data: QuestionValue[] = [];
	for (const question of formSchema.questions.data) {
		switch (question.type) {
			case QuestionType.TEXT:
			case QuestionType.TEXTAREA:
			case QuestionType.COLOR:
			case QuestionType.RADIO_GROUP: {
				const formValue = formData.get(question.name);
				if (typeof formValue !== 'string') {
					throw new Error('invalid form value');
				}

				data.push({
					type: question.type,
					name: question.name,
					value: formValue
				} satisfies TextQuestionValue | TextareaQuestionValue | ColorQuestionValue | RadioGroupQuestionValue);
				break;
			}

			case QuestionType.DATE:
			case QuestionType.TIME:
			case QuestionType.DATETIME: {
				const formValue = formData.get(question.name);
				if (typeof formValue !== 'string') {
					throw new Error('invalid form value');
				}

				data.push({
					type: question.type,
					name: question.name,
					value: formValue
				} satisfies DateQuestionValue | TimeQuestionValue | DatetimeQuestionValue);
				break;
			}

			case QuestionType.NUMBER: {
				const formValue = formData.get(question.name);
				if (typeof formValue !== 'string') {
					throw new Error('invalid form value');
				}

				const value = Number(formValue);
				data.push({
					type: question.type,
					name: question.name,
					value
				} satisfies NumberQuestionValue);
				break;
			}

			case QuestionType.BOOLEAN: {
				const formValue = formData.get(question.name);
				if (typeof formValue !== 'string') {
					throw new Error('invalid form value');
				}

				const value = formValue === 'true';
				data.push({
					type: question.type,
					name: question.name,
					value
				} satisfies BooleanQuestionValue);
				break;
			}

			case QuestionType.AVAILABILITY: {
				const value: AvailabilityQuestionValue['value'] = Array.from(
					{ length: question.maxDatetimeRanges ?? DEFAULT_MAX_DATE_RANGES },
					(_, i) => {
						const startDateFormValue = formData.get(`${question.name}-${i}-start`);
						const endDateFormValue = formData.get(`${question.name}-${i}-end`);
						if (typeof startDateFormValue !== 'string' || typeof endDateFormValue !== 'string') {
							throw new Error('invalid form value');
						}

						return [startDateFormValue, endDateFormValue];
					}
				);
				data.push({
					type: question.type,
					name: question.name,
					value
				} satisfies AvailabilityQuestionValue);
				break;
			}

			default: {
				throw new Error('unknown question type');
			}
		}
	}

	return data;
}
