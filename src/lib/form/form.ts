import type { ID } from './id';

/**
 * Timestamp is a local timestamp. A date is represented as a string
 * in the format YYYY-MM-DD. A datetime is represented as a string in the
 * format YYYY-MM-DDTHH:MM:SS.
 */
export type Timestamp = string;

/**
 * Form is a form.
 */
export interface Form {
	/**
	 *  id is the form ID.
	 */
	id: ID;

	/**
	 * permissions is the permissions data for the form.
	 *
	 * Status: Future work.
	 */
	// permissions: FormPermissions;

	/**
	 * title is the title of the form.
	 */
	title?: string;

	/**
	 * description is the markdown description of the form. This is displayed
	 * in the Discord message.
	 */
	description?: string;

	/**
	 * questions is the list of questions for the form.
	 */
	questions: QuestionList;

	/**
	 * discordMessageID is the ID of the Discord message that the form is linked to (if any).
	 */
	discordMessageID?: ID;

	/**
	 * discordChannelID is the ID of the Discord channel that the message is in.
	 */
	discordChannelID: ID;

	/**
	 * discordThreadID is the ID of the Discord thread that the message is in.
	 */
	discordThreadID?: ID;

	/**
	 * startDate is the start time for the form.
	 *
	 * This is also the time that the form will be posted to Discord.
	 */
	startDate: Timestamp;

	/**
	 * endDate is the end time for the form.
	 *
	 * This is when the form will be closed and may be edited.
	 */
	endDate: Timestamp | null;

	/**
	 * timezone is the timezone ID for the form. Defaults to UTC/GMT.
	 */
	timezone?: string;

	/**
	 * allowsMultipleSubmissions is whether or not the form allows multiple
	 * submissions. Defaults to false.
	 */
	allowsMultipleSubmissions?: boolean;

	/**
	 * anonymized is whether or not the form's submissions are anonymized.
	 *
	 * Defaults to false.
	 */
	anonymized?: boolean;
}

/**
 * Question is a component of a form.
 */
export type Question =
	| BooleanQuestion
	| RadioGroupQuestion
	| NumberQuestion
	| TextQuestion
	| TextareaQuestion
	| ColorQuestion
	| DateQuestion
	| TimeQuestion
	| DatetimeQuestion
	| AvailablityQuestion
	| TimezoneQuestion
	| SelectQuestion;

/**
 * QuestionValue is the value of a question.
 */
export type QuestionValue =
	| BooleanQuestionValue
	| RadioGroupQuestionValue
	| NumberQuestionValue
	| TextQuestionValue
	| TextareaQuestionValue
	| ColorQuestionValue
	| DateQuestionValue
	| TimeQuestionValue
	| DatetimeQuestionValue
	| AvailabilityQuestionValue
	| TimezoneQuestionValue;

/**
 * QuestionList is a list of questions.
 */
export interface QuestionList {
	/**
	 * data is the list of questions.
	 */
	data: Question[];

	/**
	 * shuffled is whether or not the questions are shuffled.
	 *
	 * By default, questions are not shuffled.
	 */
	shuffled?: boolean;
}

/**
 * QuestionType is the type of question.
 */
export enum QuestionType {
	NUMBER = 'number',
	RADIO_GROUP = 'radio_group',
	TEXT = 'text',
	TEXTAREA = 'textarea',
	BOOLEAN = 'boolean',
	COLOR = 'color',
	DATE = 'date',
	TIME = 'time',
	DATETIME = 'datetime',
	AVAILABILITY = 'availability',
	TIMEZONE = 'timezone',
	SELECT = 'select'
}

/**
 * QuestionBase is the base for all questions.
 */
export interface QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType;

	/**
	 * name is the name of the question.
	 */
	name: string;

	/**
	 * content is the markdown question content for the form field.
	 */
	content: string;

	/**
	 * position is the position of the question in the form.
	 */
	position: number;

	/**
	 * disabled is whether or not the form field is disabled.
	 */
	disabled?: boolean;

	/**
	 * required is whether or not the form field is required.
	 *
	 * By default, form fields are not required.
	 */
	required?: boolean;
}

/**
 * QuestionValueBase is the base for all question values.
 */
export interface QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType;

	/**
	 * name is the name of the question.
	 */
	name: string;
}

/**
 * RadioGroupQuestion is a traditional multiple choice question.
 */
export interface RadioGroupQuestion extends QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.RADIO_GROUP;

	/**
	 * choices is the list of choices for the question.
	 *
	 * TODO: Update to choices: { value: string; content: string; }[].
	 * This will allow for custom choice values. Replace choiceIndex with value.
	 */
	choices: {
		value: string;
		content: string;
	}[];

	/**
	 * allowCustomChoice is whether or not the form field has a custom choice.
	 *
	 * By default, custom choices are not allowed.
	 */
	allowCustomChoice?: boolean;

	/**
	 * choiceIndex is the value choice index for the question.
	 */
	choiceIndex?: number;

	/**
	 * customChoice is the value custom choice for the form field.
	 *
	 * The custom choice is only used if allowCustomChoice is true.
	 */
	customChoice?: string;

	/**
	 * value is the default value for the question.
	 */
	value?: string;
}

export interface RadioGroupQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.RADIO_GROUP;

	/**
	 * value is the value of the question.
	 */
	value: string;
}

export interface NumberQuestion extends QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.NUMBER;

	/**
	 * min is the minimum value for the number.
	 */
	min?: number;

	/**
	 * max is the maximum value for the number.
	 */
	max?: number;

	/**
	 * step is the step value for the number.
	 */
	step?: number;

	/**
	 * value is the value for the number.
	 */
	value?: number;

	/**
	 * placeholder is the placeholder value for the number;
	 */
	placeholder?: string;
}

export interface NumberQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.NUMBER;

	/**
	 * value is the value of the question.
	 */
	value: number;
}

export interface TextQuestion extends QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.TEXT;

	/**
	 * minLength is the minimum length for the text.
	 */
	minLength?: number;

	/**
	 * maxLength is the maximum length for the text.
	 */
	maxLength?: number;

	/**
	 * value is the value for the text.
	 */
	value?: string;

	/**
	 * placeholder is the placeholder value for the text;
	 */
	placeholder?: string;

	/**
	 * pattern is the regex pattern for the text.
	 */
	pattern?: string;

	/**
	 * choices is the list of suggestions for the text.
	 */
	choices?: string[];
}

export interface TextQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.TEXT;

	/**
	 * value is the value of the question.
	 */
	value: string;
}

export interface TextareaQuestion extends QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.TEXTAREA;

	/**
	 * minLength is the minimum value for the text area.
	 */
	minLength?: number;

	/**
	 * maxLength is the maximum value for the text area.
	 */
	maxLength?: number;

	/**
	 * value is the value for the text area.
	 */
	value?: string;

	/**
	 * placeholder is the placeholder value for the text area;
	 */
	placeholder?: string;
}

export interface TextareaQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.TEXTAREA;

	/**
	 * value is the value of the question.
	 */
	value: string;
}

export interface BooleanQuestion extends QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.BOOLEAN;

	/**
	 * style is the style of the boolean question. Defaults to checkbox.
	 */
	style?: 'checkbox' | 'radio';

	/**
	 * value is the value for the boolean question.
	 */
	value?: boolean;
}

export interface BooleanQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.BOOLEAN;

	/**
	 * value is the value of the question.
	 */
	value: boolean;
}

export interface ColorQuestion extends QuestionBase {
	/**
	 * type is the type of form field
	 */
	type: QuestionType.COLOR;

	/**
	 * value is the value for the color input.
	 */
	value?: string;
}

export interface ColorQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.COLOR;

	/**
	 * value is the value of the question.
	 */
	value: string;
}

export interface DateQuestion extends QuestionBase {
	/**
	 * type is the type of form field
	 */
	type: QuestionType.DATE;

	/**
	 * value is the value for the date input.
	 */
	value?: Timestamp;

	/**
	 * min is the minimum value for the date input.
	 */
	min?: Timestamp;

	/**
	 * max is the maximum value for the date input.
	 */
	max?: Timestamp;
}

export interface DateQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.DATE;

	/**
	 * value is the value of the question.
	 */
	value: Timestamp;
}

export interface TimeQuestion extends QuestionBase {
	/**
	 * type is the type of form field
	 */
	type: QuestionType.TIME;

	/**
	 * value is the value value for the time input.
	 */
	value?: Timestamp;

	/**
	 * min is the minimum value for the time input.
	 */
	min?: Timestamp;

	/**
	 * max is the maximum value for the time input.
	 */
	max?: Timestamp;
}

export interface TimeQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.TIME;

	/**
	 * value is the value of the question.
	 */
	value: Timestamp;
}

export interface DatetimeQuestion extends QuestionBase {
	/**
	 * type is the type of form field
	 */
	type: QuestionType.DATETIME;

	/**
	 * value is the value for the datetime input.
	 */
	value?: Timestamp;

	/**
	 * min is the minimum value for the datetime input.
	 */
	min?: Timestamp;

	/**
	 * max is the maximum value for the datetime input.
	 */
	max?: Timestamp;
}

export interface DatetimeQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.DATETIME;

	/**
	 * value is the value of the question.
	 */
	value: Timestamp;
}

export const DEFAULT_MAX_DATE_RANGES = 1;

export interface AvailablityQuestion extends QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.AVAILABILITY;

	/**
	 * value is the value value for the availability question.
	 */
	value?: AvailabilityQuestionValue['value'];

	/**
	 * minStartDatetime is the minimum start date for the availability question.
	 */
	minStartDatetime?: Timestamp;

	/**
	 * maxEndDatetime is the maximum start date for the availability question.
	 */
	maxEndDatetime?: Timestamp;

	/**
	 * maxDatetimeRanges is the number of date input pairs that the user can enter.
	 */
	maxDatetimeRanges?: number;
}

/**
 * AvailabilityQuestionValue is a list of date ranges.
 */
export interface AvailabilityQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.AVAILABILITY;

	/**
	 * value is the list of date ranges.
	 */
	value: [Timestamp, Timestamp][];
}

/**
 * TimezoneQuestion is a timezone selection.
 */
export interface TimezoneQuestion extends QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.TIMEZONE;

	/**
	 * value is the timezone.
	 */
	value?: TimezoneQuestionValue['value'];
}

/**
 * TimezoneQuestionValue is a timezone.
 */
export interface TimezoneQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.TIMEZONE;

	/**
	 * value is the timezone ID.
	 */
	value: string;
}

/**
 * SelectQuestion is a select question with a list of options.
 */
export interface SelectQuestion extends QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.SELECT;

	/**
	 * options is the list of options for the select question.
	 */
	options: {
		value: string;
		content: string;
	}[];

	/**
	 * value is the default value for the select question.
	 */
	value?: string;
}

/**
 * SelectQuestionValue is a select question value.
 */
export interface SelectQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.SELECT;

	/**
	 * value is the value of the question.
	 */
	value: string;
}
