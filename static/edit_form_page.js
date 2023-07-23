import * as forms from "#/forms.js";
import QuestionType from "#/question_type.json";

// TODO: Get addAddQuestionForm and addQuestion.

window.addEventListener("load", setupEditFormPage);

function setupEditFormPage() {
  console.log({ QuestionType });
  const formID = forms.getFormID(window.location.pathname);
  if (!formID) {
    return;
  }

  const form = forms.getForm(formID);
  if (!form) {
    return;
  }

  renderQuestions(form);
  renderAddQuestionForm();
}

function renderAddQuestionForm() {
  const addQuestionContainer = document.querySelector(".add-question");
  if (!addQuestionContainer) {
    return;
  }

  const addQuestionForm = document.createElement("form");

  // Add question type select to choose which type of question to add.
  const questionTypeSelect = document.createElement("select");
  questionTypeSelect.name = "question_type";
  Object.entries(QuestionType).forEach(([key, value]) => {
    const option = document.createElement("option");
    option.value = key;
    option.innerText = value;
    questionTypeSelect.appendChild(option);
  });
  addQuestionForm.appendChild(questionTypeSelect);

  // Add button to add the empty question of the selected type.
  const addQuestionButton = document.createElement("button");
  addQuestionButton.innerText = "Add question";
  addQuestionButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderQuestion();
  });
  addQuestionForm.appendChild(addQuestionButton);
  addQuestionContainer.appendChild(addQuestionForm);
}

/**
 * @param {Question} data
 */
function renderQuestion(data) {
  const questionsContainer = document.querySelector(".questions");

  const question = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.innerText = QUESTION_LEGENDS[QuestionType[data.type]];
  question.appendChild(legend);

  const questionTypeField = document.createElement("input");
  questionTypeField.type = "hidden";
  questionTypeField.name = `question_type_${data.key}`;
  questionTypeField.value = data.type;
  question.appendChild(questionTypeField);

  const details = document.createElement("details");
  const summary = document.createElement("summary");

  const questionNameField = document.createElement("input");
  questionNameField.type = "text";
  questionNameField.name = `question_name_${data.key}`;
  questionNameField.id = questionNameField.name;
  if (data.name) {
    questionNameField.value = data.name;
  }
  const questionNameLabel = document.createElement("label");
  questionNameLabel.innerText = "Question name (unique ID):";
  questionNameLabel.htmlFor = questionNameField.name;
  const questionNameGroup = document.createElement("div");
  questionNameGroup.classList.add("form-group");
  questionNameGroup.appendChild(questionNameLabel);
  questionNameGroup.appendChild(questionNameField);
  summary.appendChild(questionNameGroup);
  details.appendChild(summary);

  const questionContentField = document.createElement("textarea");
  questionContentField.name = `question_content_${data.key}`;
  questionContentField.id = questionContentField.name;
  if (data.content) {
    questionContentField.innerHTML = data.content;
  }
  const questionContentLabel = document.createElement("label");
  questionContentLabel.innerText = "Question content:";
  questionContentLabel.htmlFor = questionContentField.name;
  const questionContentGroup = document.createElement("div");
  questionContentGroup.classList.add("form-group");
  questionContentGroup.appendChild(questionContentLabel);
  questionContentGroup.appendChild(questionContentField);
  details.appendChild(questionContentGroup);

  switch (QuestionType[data.type]) {
    case QuestionType.NUMBER: {
      const questionMinField = createInputField(
        "number",
        "Question min:",
        `question_min_${data.key}`,
        data.min,
      );
      const questionMaxField = createInputField(
        "number",
        "Question max:",
        `question_max_${data.key}`,
        data.max,
      );
      const questionStepField = createInputField(
        "number",
        "Question step:",
        `question_step_${data.key}`,
        data.step,
      );
      const questionDefaultField = createInputField(
        "number",
        "Question default:",
        `question_default_${data.key}`,
        data.default,
      );
      const questionPlaceholderField = createInputField(
        "text",
        "Question placeholder:",
        `question_placeholder_${data.key}`,
        data.placeholder,
      );

      details.appendChild(questionMinField);
      details.appendChild(questionMaxField);
      details.appendChild(questionStepField);
      details.appendChild(questionDefaultField);
      details.appendChild(questionPlaceholderField);
      break;
    }
    case QuestionType.SINGLE_TEXT_SELECT: {
      const questionChoicesField = createTextAreaField(
        "Question choices:",
        `question_choices_${data.key}`,
        data.choices,
      );
      const questionCustomChoiceField = createCheckboxField(
        "Question custom choice:",
        `question_custom_choice_${data.key}`,
        data.custom_choice,
      );
      const questionDefaultChoiceField = createInputField(
        "number",
        "Question default choice:",
        `question_default_choice_${data.key}`,
        data.default_choice,
      );
      const questionDefaultCustomChoiceField = createInputField(
        "text",
        "Question default custom choice:",
        `question_default_custom_choice_${data.key}`,
        data.default_custom_choice,
      );

      details.appendChild(questionChoicesField);
      details.appendChild(questionCustomChoiceField);
      details.appendChild(questionDefaultChoiceField);
      details.appendChild(questionDefaultCustomChoiceField);
      break;
    }
    case QuestionType.TEXT: {
      const questionMinLengthField = createInputField(
        "number",
        "Question min length:",
        `question_min_${data.key}`,
        data.min,
      );
      const questionMaxLengthField = createInputField(
        "number",
        "Question max length:",
        `question_max_${data.key}`,
        data.max,
      );
      const questionDefaultField = createInputField(
        "text",
        "Question default value:",
        `question_default_${data.key}`,
        data.default,
      );

      details.appendChild(questionMinLengthField);
      details.appendChild(questionMaxLengthField);
      details.appendChild(questionDefaultField);
      break;
    }
    case QuestionType.TEXTAREA: {
      const questionMinLengthField = createInputField(
        "number",
        "Question min length:",
        `question_min_${data.key}`,
        data.min,
      );
      const questionMaxLengthField = createInputField(
        "number",
        "Question max length:",
        `question_max_${data.key}`,
        data.max,
      );
      const questionDefaultField = createInputField(
        "text",
        "Question default value:",
        `question_default_${data.key}`,
        data.default,
      );
      const questionPlaceholderField = createInputField(
        "text",
        "Question placeholder:",
        `question_placeholder_${data.key}`,
        data.placeholder,
      );

      details.appendChild(questionMinLengthField);
      details.appendChild(questionMaxLengthField);
      details.appendChild(questionDefaultField);
      details.appendChild(questionPlaceholderField);
      break;
    }
    case QuestionType.CHECKBOX: {
      const questionDefaultField = createCheckboxField(
        "Question default value:",
        `question_default_${data.key}`,
        data.default,
      );

      details.appendChild(questionDefaultField);
      break;
    }
    case QuestionType.COLOR: {
      const questionDefaultField = createInputField(
        "color",
        "Question default value:",
        `question_default_${data.key}`,
        data.default,
      );

      details.appendChild(questionDefaultField);
      break;
    }
    default: {
      break;
    }
  }

  question.appendChild(details);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();

    const confirmed = confirm("Are you sure you want to delete this question?");
    if (confirmed) {
      // Remove from DOM.
      question.remove();

      // You may consider adding a callback to notify the parent component or perform any other actions.
    }
  });
  question.appendChild(deleteButton);
  questionsContainer.appendChild(question);
}

/**
 * Creates an input field with the specified type, label, name, and value.
 *
 * @param {string} type - The type of the input field (e.g., "text", "number", "checkbox", etc.).
 * @param {string} label - The label text to be displayed for the input field.
 * @param {string} name - The name attribute for the input field.
 * @param {string} [value] - The value to be set for the input field (optional).
 * @returns {HTMLElement} - The div container that wraps the input field and its label.
 */
function createInputField(type, label, name, value) {
  const field = document.createElement("input");
  field.type = type;
  field.name = name;
  field.id = name;
  if (value) {
    field.value = value;
  }

  const fieldLabel = document.createElement("label");
  fieldLabel.innerText = label;
  fieldLabel.htmlFor = name;

  const fieldGroup = document.createElement("div");
  fieldGroup.classList.add("form-group");
  fieldGroup.appendChild(fieldLabel);
  fieldGroup.appendChild(field);

  return fieldGroup;
}

/**
 * Creates a textarea field with the specified label, name, and value.
 *
 * @param {string} label - The label text to be displayed for the textarea.
 * @param {string} name - The name attribute for the textarea.
 * @param {string} [value] - The text value to be set for the textarea (optional).
 * @returns {HTMLElement} - The div container that wraps the textarea and its label.
 */
function createTextAreaField(label, name, value) {
  const field = document.createElement("textarea");
  field.name = name;
  field.id = name;
  if (value) {
    field.innerText = value;
  }

  const fieldLabel = document.createElement("label");
  fieldLabel.innerText = label;
  fieldLabel.htmlFor = name;

  const fieldGroup = document.createElement("div");
  fieldGroup.classList.add("form-group");
  fieldGroup.appendChild(fieldLabel);
  fieldGroup.appendChild(field);

  return fieldGroup;
}

/**
 * Creates a checkbox field with the specified label, name, and checked status.
 *
 * @param {string} label - The label text to be displayed for the checkbox.
 * @param {string} name - The name attribute for the checkbox.
 * @param {boolean} checked - The checked status for the checkbox.
 * @returns {HTMLElement} - The div container that wraps the checkbox and its label.
 */
function createCheckboxField(label, name, checked) {
  const field = document.createElement("input");
  field.type = "checkbox";
  field.name = name;
  field.id = name;
  if (checked) {
    field.checked = true;
  }

  const fieldLabel = document.createElement("label");
  fieldLabel.innerText = label;
  fieldLabel.htmlFor = name;

  const fieldGroup = document.createElement("div");
  fieldGroup.classList.add("form-group");
  fieldGroup.appendChild(fieldLabel);
  fieldGroup.appendChild(field);

  return fieldGroup;
}

// TODO: Define Difflint annotation for QuestionType in `form/form.py`.

const QUESTION_LEGENDS = {
  [QuestionType.NUMBER]: "Number",
  [QuestionType.SINGLE_TEXT_SELECT]: "Single text select",
  [QuestionType.TEXT]: "Text",
  [QuestionType.TEXTAREA]: "Textarea",
  [QuestionType.CHECKBOX]: "Checkbox",
  [QuestionType.COLOR]: "Color",
};

function renderQuestions() {}
