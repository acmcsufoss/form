// Reference:
// https://github.com/acmcsufoss/form/blob/581e2cea7ed0b0b873c61b05cb5a9c4d9606f99b/form/form.py

/**
 * Form is a form.
 */
export interface Form {
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
