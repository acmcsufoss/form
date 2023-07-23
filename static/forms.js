const FORMS_PREFIX = "/forms/";

/**
 * @typedef {{
 *   type: string;
 *   name: string;
 *   content: string;
 *   required: boolean;
 *   choices?: string[];
 *   custom_choice?: boolean;
 *   default_choice?: number | null;
 *   default_custom_choice?: string | null;
 *   min?: number | null;
 *   max?: number | null;
 *   step?: number | null;
 *   placeholder?: string | null;
 *   min_length?: number | null;
 *   max_length?: number | null;
 *   pattern?: string | null;
 *   default?: string | number | boolean | null;
 * }} Question
 */

/**
 * @typedef {{
 *   data: Question[];
 *   shuffled: boolean;
 * }} QuestionList
 */

/**
 * @typedef {{
 *   webhook_url: string;
 *   content: string;
 *   id: string | null;
 *   timestamp: string | null;
 * }} DiscordMessage
 */

/**
 * @typedef {{
 *   id: string;
 *   questions: QuestionList | null;
 *   linked_discord_message: DiscordMessage | null;
 * }} Form
 */

/**
 * getFormID gets the form ID from the URL.
 *
 * @param {string} pathname The URL to get the form ID from.
 * @returns {string | undefined} The form ID or undefined if the URL is not a form URL.
 */
export function getFormID(pathname) {
  if (!pathname.startsWith(FORMS_PREFIX)) {
    return;
  }

  return pathname.substring(
    FORMS_PREFIX.length,
    pathname.indexOf("/", FORMS_PREFIX.length),
  );
}

/**
 * setForm sets the form in local storage.
 *
 * @param {Form} form The form to update.
 * @returns {Promise<void>} A promise that resolves when the form is updated.
 * @throws {Error} If the form ID is not set or the form is not found.
 */
export async function setForm(form) {
  if (!form.id) {
    throw new Error("form ID not set");
  }

  localStorage.setItem(form.id, JSON.stringify(form));
  return Promise.resolve();
}

/**
 * getForm gets the form from local storage.
 *
 * @param {string} formID The ID of the form to get.
 * @returns {Promise<Form>} A promise that resolves with the form.
 */
export async function getForm(formID) {
  const form = localStorage.getItem(formID);
  if (!form) {
    throw new Error("form not found");
  }

  return Promise.resolve(JSON.parse(form));
}

/**
 * fromElement gets the form from the element.
 *
 * @param {HTMLFormElement} element The element to get the form from.
 * @returns {Form} The form.
 */
export function fromElement(element) {
  // TODO: Parse form from form editor element.
  // TODO: Use this function to store the form state in localStorage.
  const id = getFormID(element.action);
  if (!id) {
    throw new Error("form ID not set");
  }

  const shuffled = element.querySelector("input[name=shuffled]").checked;

  const discordWebhookURL = element.querySelector(
    "input[name=discord_webhook_url]",
  )?.value;
  if (typeof discordWebhookURL !== "string") {
    throw new Error("discord webhook URL not set");
  }

  const discordMessageContent = element.querySelector(
    "textarea[name=discord_message_content]",
  )?.value;
  if (typeof discordMessageContent !== "string") {
    throw new Error("discord message content not set");
  }

  const discordMessageTimestamp = element.querySelector(
    "input[name=discord_message_timestamp]",
  )?.value;
  if (typeof discordMessageTimestamp !== "string") {
    throw new Error("discord message timestamp not set");
  }

  /** @type {Question[]} */
  const questionData = Array.from(
    element.querySelectorAll("div.question"),
  ).reduce((allQuestions, questionElement) => {
    /** @type {Question} */
    const question = {};
    questionElement.forEach((questionElement) => {
      questionElement
        .querySelectorAll("input, select, textarea")
        .forEach((inputElement) => {
          question[inputElement.name] = inputElement.value;
        });
    });
    allQuestions.push(question);
    return allQuestions;
  }, []);

  return {
    id,
    questions: { shuffled, data: questionData },
    linked_discord_message: {
      id: null,
      webhook_url: discordWebhookURL,
      content: discordMessageContent,
      timestamp: discordMessageTimestamp,
    },
  };
}
