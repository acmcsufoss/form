// Reference:
// https://github.com/acmcsufoss/form/blob/581e2cea7ed0b0b873c61b05cb5a9c4d9606f99b/form/form.py

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

// for keeping track of a Discord message.
export interface DiscordMessage {
    // id is the ID of the Discord message that the form is linked to (if any).
    id?: string;

    // webhook_url is the webhook URL of the Discord message.
    webhook_url: string;

    // content is the Discord message content.
    content: string;

    // timestamp is the Discord message timestamp.
    timestamp: Date;
}

// for keeping track of a list of questions.
export interface QuestionList {
    // data is the list of questions.
    data: Question[];

    // shuffled is whether or not the questions are shuffled.
    shuffled: boolean; 
}

// for keeping track of a question.
export interface Question {
    // type is the type of form field.
    type: QuestionType;

    // name is the name of the form field.
    name: string;

    // content is the markdown question content for the form field.
    content: string;

    // required is whether or not the form field is required.
    required: boolean;
}

export enum QuestionType {
    // Enum for keeping track of question types.

    NUMBER = "number",
    SINGLE_TEXT_SELECT = "single_text_select",
    TEXT = "text",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox",
    COLOR = "color"
}
