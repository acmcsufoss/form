/**
 * ID is a unique identifier.
 */
export type ID = string;

/**
 * Timestamp is a Unix timestamp. It is the number of milliseconds since
 * January 1, 1970, 00:00:00 UTC.
 */
export type Timestamp = number;

/**
 * Form is a form.
 */
export interface Form {
	/**
	 *  id is the form ID.
	 */
	id: ID;

	/**
	 * questions is the list of questions for the form.
	 */
	questions: QuestionList;

	/**
	 * message is the Discord message that the form is linked to.
	 */
	message?: DiscordMessage;

	/**
	 * allowMultipleSubmissions is whether or not the form allows multiple
	 * submissions. Defaults to false.
	 */
	allowMultipleSubmissions?: boolean;
}

/**
 * DiscordMessage is a Discord message.
 */
export interface DiscordMessage {
	/**
	 * id is the ID of the Discord message that the form is linked to (if any).
	 */
	id?: ID;

	/**
	 * content is the content of the Discord message.
	 */
	content?: string;

	/**
	 * channelID is the ID of the Discord channel that the message is in.
	 */
	channelID: ID;

	/**
	 * threadID is the ID of the Discord thread that the message is in.
	 */
	threadID?: ID;

	/**
	 * timestamp is the Discord message timestamp.
	 */
	timestamp: Timestamp;
}

/**
 * Question is a component of a form.
 */
export type Question =
	| BooleanQuestion
	| SingleTextSelectQuestion
	| NumberQuestion
	| TextQuestion
	| TextareaQuestion
	| ColorQuestion
	| DateQuestion
	| TimeQuestion
	| DatetimeQuestion
	| AvailablityQuestion;

/**
 * QuestionValue is the value of a question.
 */
export type QuestionValue =
	| BooleanQuestionValue
	| SingleTextSelectQuestionValue
	| NumberQuestionValue
	| TextQuestionValue
	| TextareaQuestionValue
	| ColorQuestionValue
	| DateQuestionValue
	| TimeQuestionValue
	| DatetimeQuestionValue
	| AvailabilityQuestionValue;

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
	 */
	shuffled: boolean;
}

/**
 * QuestionType is the type of question.
 */
export enum QuestionType {
	NUMBER = 'number',
	SINGLE_TEXT_SELECT = 'single_text_select',
	TEXT = 'text',
	TEXTAREA = 'textarea',
	BOOLEAN = 'boolean',
	COLOR = 'color',
	DATE = 'date',
	TIME = 'time',
	DATETIME = 'datetime',
	AVAILABILITY = 'availability'
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
	 * required is whether or not the form field is required.
	 */
	required: boolean;
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

export interface SingleTextSelectQuestion extends QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.SINGLE_TEXT_SELECT;

	/**
	 * choices is the list of choices for the question.
	 */
	choices: string[];

	/**
	 * customChoice is whether or not the form field has a custom choice.
	 */
	customChoice: boolean;

	/**
	 * defaultChoiceIndex is the default choice index for the question.
	 */
	defaultChoiceIndex?: number;

	/**
	 * defaultCustomChoice is the default custom choice for the form field.
	 */
	defaultCustomChoice?: string;
}

export interface SingleTextSelectQuestionValue extends QuestionValueBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.SINGLE_TEXT_SELECT;

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
	 * default is the default value for the number.
	 */
	default?: number;

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
	 * default is the default value for the text.
	 */
	default?: string;

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
	 * default is the default value for the text area.
	 */
	default?: string;

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
	 * style is the style of the boolean question.
	 */
	style: 'checkbox' | 'radio';

	/**
	 * default is the default value for the boolean question.
	 */
	default: boolean;
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
	 * default is the default value for the color input.
	 */
	default?: string;
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
	 * default is the default value for the date input.
	 */
	default?: Timestamp;

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
	 * default is the default value for the time input.
	 */
	default?: Timestamp;

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
	 * default is the default value for the datetime input.
	 */
	default?: Timestamp;

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

export const DEFAULT_MAX_DATE_RANGES = 10;

export interface AvailablityQuestion extends QuestionBase {
	/**
	 * type is the type of question.
	 */
	type: QuestionType.AVAILABILITY;

	/**
	 * default is the default value for the availability question.
	 */
	default?: AvailabilityQuestionValue['value'];

	/**
	 * minStartDatetime is the minimum start date for the availability question.
	 */
	minStartDatetime?: Timestamp;

	/**
	 * maxEndDatetime is the maximum start date for the availability question.
	 */
	maxEndDatetime?: Timestamp;

	/**
	 * maxDateRanges is the number of date input pairs that the user can enter.
	 */
	maxDateRanges?: number;
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
