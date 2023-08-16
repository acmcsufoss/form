/**
 * StoredForm is one form in the database.
 *
 * Everything but the ID is optional at first to leave
 * blank for the user to populate later. This happens when
 * the user creates a new form.
 */
export interface StoredForm {
  /**
   * id is the unique identifier for the form.
   */
  id: string;

  /**
   * questions is the list of questions in the form.
   */
  questions?: StoredQuestionList;

  /**
   * linkedDiscordMessage is the Discord message that is linked to this form.
   */
  linkedDiscordMessage?: DiscordMessage;
}

/**
 * StoredQuestion is one question in the database.
 */
export interface StoredQuestionList {
  /**
   * isShuffled shuffles the questions if true.
   */
  isShuffled: boolean;

  /**
   * data is the list of questions in the form.
   */
  // data: StoredQuestion[];
}

/**
 * DiscordMessage is a Discord message.
 */
export interface DiscordMessage {
  /**
   * id is the unique identifier for the message.
   */
  id: string;
}

/**
 * getForms returns all forms in the database.
 */
export async function getForms(): Promise<StoredForm[]> {
  // TODO: return all forms in the database via Deno KV.
  // https://deno.land/api?s=Deno.Kv&unstable=
  return [];
}

// export async function getFormByID() {}

// export async function createForm() {}

// export async function updateForm() {}

// export async function deleteForm() {}

// export async function getResponses() {}

// export async function getResponseByID() {}

// export async function createResponse() {}

// export async function updateResponse() {}
