// Reference:
// https://github.com/acmcsufoss/form/blob/581e2cea7ed0b0b873c61b05cb5a9c4d9606f99b/form/form.py
// ISSUE: Some of the variables are the wrong type
// TODO: FIX COMMENTS AND VARIABLE NAMES AND TYPES

/**
 * Form is a form.
 */
export interface Form {
	/**
	 *  id is the form ID.
	 */
	id: string;

	/**
	 * questions is the list of questions for the form.
	 */
	questions?: QuestionList;

	/**
	 * linked_discord_message is the Discord message that the form is linked to.
	 */
	linked_discord_message?: DiscordMessage;
}

/**
 * Class for keeping track of a map of forms.
 */
export interface FormMap {
	/**
	 * TODO: make "data: dict[str, Form]" into typescript
	 * idk if this works??
	 */
	data: Map<string, Form>;
}

/**
 * for keeping track of a Discord message.
 */
export interface DiscordMessage {
	/**
	 * id is the ID of the Discord message that the form is linked to (if any).
	 */
	id?: string;

	/**
	 * webhook_url is the webhook URL of the Discord message.
	 */
	webhook_url: string;

	/**
	 * content is the Discord message content.
	 */
	content: string;

	/**
	 * timestamp is the Discord message timestamp.
	 */
	timestamp: Date;
}

/**
 * for keeping track of a list of questions.
 */
export interface QuestionList {
	/**
	 * data is the list of questions.
	 */
	data: Array<
		| CheckboxQuestion
		| SingleTextSelectQuestion
		| NumberQuestion
		| TextQuestion
		| TextareaQuestion
		| ColorQuestion
	>;

	/**
	 * shuffled is whether or not the questions are shuffled.
	 */
	shuffled: boolean;
}

/**
 * for keeping track of a question.
 */
export interface Question {
	/**
	 * type is the type of form field.
	 */
	type: QuestionType;

	/**
	 * name is the name of the form field.
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

export interface SingleTextSelectQuestion extends Question {
	/**
	 * type is the type of form field.
	 */
	type: QuestionType.SINGLE_TEXT_SELECT;

	/**
	 * choices is the list of choices for the form field.
	 */
	choices: string[];

	/**
	 * custom_choice is whether or not the form field has a custom choice.
	 */
	custom_choice: boolean;

	/**
	 * default_choice is the default choice for the form field.
	 */
	default_choice?: number;

	/**
	 * default_custom_choice is the default custom choice for the form field.
	 */
	default_custom_choice?: string;
}

export interface NumberQuestion extends Question {
	/**
	 * type is the type of form field
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
	 * defualt is the default value for the number.
	 */
	default?: number;

	/**
	 * placeholder is the placeholder value for the number;
	 */
	placeholder?: string;

	/**
	 * step is the step value for the number.
	 */
	step?: number;
}

/**
 * type is the type of form field
 */
export interface TextQuestion extends Question {
	type: QuestionType.TEXT;
	/**
	 * min is the minimum length for the text.
	 */
	min_length?: number;
	/**
	 * max is the maximum length for the text.
	 */
	max_length?: number;
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
}

export interface TextareaQuestion extends Question {
	/**
	 * type is the type of form field
	 */
	type: QuestionType.TEXTAREA;
	/**
	 * min is the minimum value for the text area.
	 */
	min_length?: number;
	/**
	 * max is the maximum value for the text area.
	 */
	max_length?: number;
	/**
	 * default is the default value for the text area.
	 */
	default?: string;
	/**
	 * placeholder is the placeholder value for the text area;
	 */
	placeholder?: string;
}

export interface CheckboxQuestion extends Question {
	/**
	 * type is the type of form field
	 */
	type: QuestionType.CHECKBOX;
	/**
	 * default is the default value for the checkbox.
	 */
	default: boolean;
}

export interface ColorQuestion extends Question {
	/**
	 * type is the type of form field
	 */
	type: QuestionType.COLOR;
	/**
	 * default is the default value for the color input.
	 */
	default?: string;
}

export interface AvialablityQuestion extends Question {
	/**
	 * type is the type of form field
	 */
	type: QuestionType.AVAILABILITY;
	/**
	 * default is the default value for the color input.
	 * TODO: deafult type is probably wrong here
	 */
	default?: Date;

	/**
	 * min_start_date is the minimum start date for the availability question.
	 */
	min_start_date?: Date;

	/**
	 * max_start_date is the maximum start date for the availability question.
	 */
	max_end_date?: Date;

	/**
	 * Date ranges are the number of date inputs that the user can enter.
	 */
	max_date_ranges?: number;

}

export enum QuestionType {
	/**
	 * Enum for keeping track of question types.
	 */

	NUMBER = 'number',
	SINGLE_TEXT_SELECT = 'single_text_select',
	TEXT = 'text',
	TEXTAREA = 'textarea',
	CHECKBOX = 'checkbox',
	COLOR = 'color',
	AVAILABILITY = 'datetime'
}
