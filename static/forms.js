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
 *   fields: Question[];
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
 * @param {URL} url The URL to get the form ID from.
 * @returns {string | null} The form ID or null if the URL is not a form URL.
 */
export function getFormID(url) {
  if (!url.pathname.startsWith(FORMS_PREFIX)) {
    return null;
  }

  return url.pathname.substring(
    FORMS_PREFIX.length,
    url.pathname.indexOf("/", FORMS_PREFIX.length),
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
}
