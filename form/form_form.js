document.addEventListener("DOMContentLoaded", () => {
  const formForm = document.querySelector(".form-form");
  if (!formForm) {
    return;
  }

  // Add event listener to save form data when it changes.
  formForm.addEventListener("change", (event) => {
    const name = event.target.name;
    let value = event.target.value;
    switch (event.target.type) {
      case "checkbox": {
        value = event.target.checked ? "on" : "off";
        break;
      }

      case "radio": {
        value = event.target.value;
        break;
      }
    }

    // Save the input element's value to local storage by its name.
    saveFormItem(name, value);
    console.info(`Saved ${name} (${value}) to local storage.`);
  });

  // Load form data from local storage by reading all input elements' values
  // and setting them to the values from local storage.
  const inputs = formForm.querySelectorAll("input,textarea,select");
  inputs.forEach((input) => {
    const stored = readFormItem(input.name);
    if (stored) {
      switch (input.type) {
        case "checkbox": {
          input.checked = stored === "on";
          break;
        }

        case "radio": {
          input.checked = input.value === stored;
          break;
        }

        default: {
          input.value = stored;
        }
      }

      console.info(`Loaded ${input.name} (${stored}) from local storage.`);
    }
  });

  // Add the add question form to the page.
  addAddQuestionForm();
});

/**
 * @typedef {{
 *   key: string,
 *   name: string,
 *   content: string,
 *   required: boolean,
 *   type: QuestionType,
 *   min?: number,
 *   max?: number,
 *   step?: number,
 *   default?: number,
 *   placeholder?: string,
 *   choices?: string,
 *   custom_choice?: boolean,
 *   default_choice?: number,
 *   default_custom_choice?: string,
 * }} Question
 */

/**
 * @typedef {{
 *  questions: Question[],
 *  linked_discord_message: {
 *    channel_id: string,
 *    content: string,
 *  },
 *  shuffled: boolean,
 * }} Form
 */

// TODO: Create a localStorage wrapper for mapping form questions to sorted arrays of indices.

function addAddQuestionForm() {
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
    addQuestion();
  });
  addQuestionForm.appendChild(addQuestionButton);
  addQuestionContainer.appendChild(addQuestionForm);

  // List all of the questions stored in local storage.
  const questions = readFormItems();

  // Add all of the stored questions to the page.
  questions.forEach(addQuestion);
}

/**
 * @param {Question | undefined} data
 */
function addQuestion(data) {
  const questionsContainer = document.querySelector(".questions");
  data ||= {
    key: Math.random().toString(36).substring(2, 15),
    type: (() => {
      const questionTypeField = document.querySelector(
        "select[name=question_type]",
      );
      if (!(questionTypeField.value in QuestionType)) {
        throw new Error("Invalid question type.");
      }

      return questionTypeField.value;
    })(),
  };

  const question = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.innerText = QUESTION_LEGENDS[QuestionType[data.type]];
  question.appendChild(legend);

  const questionTypeField = document.createElement("input");
  questionTypeField.type = "hidden";
  questionTypeField.name = `question_type_${data.key}`;
  questionTypeField.value = data.type;
  question.appendChild(questionTypeField);
  saveFormItem(questionTypeField.name, questionTypeField.value);

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
  saveFormItem(questionNameField.name, questionNameField.value);

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
  saveFormItem(questionContentField.name, questionContentField.value);

  const questionRequiredField = document.createElement("input");
  questionRequiredField.type = "checkbox";
  questionRequiredField.name = `question_required_${data.key}`;
  questionRequiredField.id = questionRequiredField.name;
  if (data.required) {
    questionRequiredField.checked = true;
  }
  const questionRequiredLabel = document.createElement("label");
  questionRequiredLabel.innerText = "Question required:";
  questionRequiredLabel.htmlFor = questionRequiredField.name;
  const questionRequiredGroup = document.createElement("div");
  questionRequiredGroup.classList.add("form-group");
  questionRequiredGroup.appendChild(questionRequiredLabel);
  questionRequiredGroup.appendChild(questionRequiredField);
  details.appendChild(questionRequiredGroup);
  saveFormItem(
    questionRequiredField.name,
    questionRequiredField.checked ? "on" : "off",
  );

  switch (QuestionType[data.type]) {
    case QuestionType.NUMBER: {
      const questionMinField = document.createElement("input");
      questionMinField.type = "number";
      questionMinField.name = `question_min_${data.key}`;
      questionMinField.id = questionMinField.name;
      if (data.min) {
        questionMinField.value = data.min;
      }
      const questionMinLabel = document.createElement("label");
      questionMinLabel.innerText = "Question min:";
      questionMinLabel.htmlFor = questionMinField.name;
      const questionMinGroup = document.createElement("div");
      questionMinGroup.classList.add("form-group");
      questionMinGroup.appendChild(questionMinLabel);
      questionMinGroup.appendChild(questionMinField);
      details.appendChild(questionMinGroup);
      saveFormItem(questionMinField.name, questionMinField.value);

      const questionMaxField = document.createElement("input");
      questionMaxField.type = "number";
      questionMaxField.name = `question_max_${data.key}`;
      questionMaxField.id = questionMaxField.name;
      if (data.max) {
        questionMaxField.value = data.max;
      }
      const questionMaxLabel = document.createElement("label");
      questionMaxLabel.innerText = "Question max:";
      questionMaxLabel.htmlFor = questionMaxField.name;
      const questionMaxGroup = document.createElement("div");
      questionMaxGroup.classList.add("form-group");
      questionMaxGroup.appendChild(questionMaxLabel);
      questionMaxGroup.appendChild(questionMaxField);
      saveFormItem(questionMaxField.name, questionMaxField.value);

      const questionStepField = document.createElement("input");
      questionStepField.type = "number";
      questionStepField.name = `question_step_${data.key}`;
      questionStepField.id = questionStepField.name;
      if (data.step) {
        questionStepField.value = data.step;
      }
      const questionStepLabel = document.createElement("label");
      questionStepLabel.innerText = "Question step:";
      questionStepLabel.htmlFor = questionStepField.name;
      const questionStepGroup = document.createElement("div");
      questionStepGroup.classList.add("form-group");
      questionStepGroup.appendChild(questionStepLabel);
      questionStepGroup.appendChild(questionStepField);
      details.appendChild(questionStepGroup);
      saveFormItem(questionStepField.name, questionStepField.value);

      const questionDefaultField = document.createElement("input");
      questionDefaultField.type = "number";
      questionDefaultField.name = `question_default_${data.key}`;
      questionDefaultField.id = questionDefaultField.name;
      if (data.default) {
        questionDefaultField.value = data.default;
      }
      const questionDefaultLabel = document.createElement("label");
      questionDefaultLabel.innerText = "Question default:";
      questionDefaultLabel.htmlFor = questionDefaultField.name;
      const questionDefaultGroup = document.createElement("div");
      questionDefaultGroup.classList.add("form-group");
      questionDefaultGroup.appendChild(questionDefaultLabel);
      questionDefaultGroup.appendChild(questionDefaultField);
      details.appendChild(questionDefaultGroup);
      saveFormItem(questionDefaultField.name, questionDefaultField.value);

      const questionPlaceholderField = document.createElement("input");
      questionPlaceholderField.type = "text";
      questionPlaceholderField.name = `question_placeholder_${data.key}`;
      questionPlaceholderField.id = questionPlaceholderField.name;
      if (data.placeholder) {
        questionPlaceholderField.value = data.placeholder;
      }
      const questionPlaceholderLabel = document.createElement("label");
      questionPlaceholderLabel.innerText = "Question placeholder:";
      questionPlaceholderLabel.htmlFor = questionPlaceholderField.name;
      const questionPlaceholderGroup = document.createElement("div");
      questionPlaceholderGroup.classList.add("form-group");
      questionPlaceholderGroup.appendChild(questionPlaceholderLabel);
      questionPlaceholderGroup.appendChild(questionPlaceholderField);
      details.appendChild(questionPlaceholderGroup);
      saveFormItem(
        questionPlaceholderField.name,
        questionPlaceholderField.value,
      );
      break;
    }

    case QuestionType.SINGLE_TEXT_SELECT: {
      const questionChoicesField = document.createElement("textarea");
      questionChoicesField.name = `question_choices_${data.key}`;
      questionChoicesField.id = questionChoicesField.name;
      questionChoicesField.placeholder = "Choice 1\nChoice 2\nChoice 3\n...";
      if (data.choices) {
        questionChoicesField.innerText = data.choices;
      }
      const questionChoicesLabel = document.createElement("label");
      questionChoicesLabel.innerText = "Question choices:";
      questionChoicesLabel.htmlFor = questionChoicesField.name;
      const questionChoicesGroup = document.createElement("div");
      questionChoicesGroup.classList.add("form-group");
      questionChoicesGroup.appendChild(questionChoicesLabel);
      questionChoicesGroup.appendChild(questionChoicesField);
      details.appendChild(questionChoicesGroup);
      saveFormItem(questionChoicesField.name, questionChoicesField.value);

      const questionCustomChoiceField = document.createElement("input");
      questionCustomChoiceField.type = "checkbox";
      questionCustomChoiceField.name = `question_custom_choice_${data.key}`;
      questionCustomChoiceField.id = questionCustomChoiceField.name;
      if (data.custom_choice) {
        questionCustomChoiceField.checked = true;
      }
      const questionCustomChoiceLabel = document.createElement("label");
      questionCustomChoiceLabel.innerText = "Question custom choice:";
      questionCustomChoiceLabel.htmlFor = questionCustomChoiceField.name;
      const questionCustomChoiceGroup = document.createElement("div");
      questionCustomChoiceGroup.classList.add("form-group");
      questionCustomChoiceGroup.appendChild(questionCustomChoiceLabel);
      questionCustomChoiceGroup.appendChild(questionCustomChoiceField);
      details.appendChild(questionCustomChoiceGroup);
      saveFormItem(
        questionCustomChoiceField.name,
        questionCustomChoiceField.checked,
      );

      const questionDefaultChoiceField = document.createElement("input");
      questionDefaultChoiceField.type = "number";
      questionDefaultChoiceField.placeholder = "Default choice index";
      questionDefaultChoiceField.name = `question_default_choice_${data.key}`;
      questionDefaultChoiceField.id = questionDefaultChoiceField.name;
      if (data.default_choice) {
        questionDefaultChoiceField.value = data.default_choice;
      }
      const questionDefaultChoiceLabel = document.createElement("label");
      questionDefaultChoiceLabel.innerText = "Question default choice:";
      questionDefaultChoiceLabel.htmlFor = questionDefaultChoiceField.name;
      const questionDefaultChoiceGroup = document.createElement("div");
      questionDefaultChoiceGroup.classList.add("form-group");
      questionDefaultChoiceGroup.appendChild(questionDefaultChoiceLabel);
      questionDefaultChoiceGroup.appendChild(questionDefaultChoiceField);
      details.appendChild(questionDefaultChoiceGroup);
      saveFormItem(
        questionDefaultChoiceField.name,
        questionDefaultChoiceField.value,
      );

      const questionDefaultCustomChoiceField = document.createElement("input");
      questionDefaultCustomChoiceField.type = "text";
      questionDefaultCustomChoiceField.placeholder = "Default custom choice";
      questionDefaultCustomChoiceField.name =
        `question_default_custom_choice_${data.key}`;
      questionDefaultCustomChoiceField.id =
        questionDefaultCustomChoiceField.name;
      if (data.default_custom_choice) {
        questionDefaultCustomChoiceField.value = data.default_custom_choice;
      }
      const questionDefaultCustomChoiceLabel = document.createElement("label");
      questionDefaultCustomChoiceLabel.innerText =
        "Question default custom choice:";
      questionDefaultCustomChoiceLabel.htmlFor =
        questionDefaultCustomChoiceField.name;
      const questionDefaultCustomChoiceGroup = document.createElement("div");
      questionDefaultCustomChoiceGroup.classList.add("form-group");
      questionDefaultCustomChoiceGroup.appendChild(
        questionDefaultCustomChoiceLabel,
      );
      questionDefaultCustomChoiceGroup.appendChild(
        questionDefaultCustomChoiceField,
      );
      details.appendChild(questionDefaultCustomChoiceGroup);
      saveFormItem(
        questionDefaultCustomChoiceField.name,
        questionDefaultCustomChoiceField.value,
      );
      break;
    }

    case QuestionType.TEXT: {
      const questionMinLengthField = document.createElement("input");
      questionMinLengthField.type = "number";
      questionMinLengthField.name = `question_min_${data.key}`;
      questionMinLengthField.id = questionMinLengthField.name;
      if (data.min) {
        questionMinLengthField.value = data.min;
      }
      const questionMinLengthLabel = document.createElement("label");
      questionMinLengthLabel.innerText = "Question min length:";
      questionMinLengthLabel.htmlFor = questionMinLengthField.name;
      const questionMinLengthGroup = document.createElement("div");
      questionMinLengthGroup.classList.add("form-group");
      questionMinLengthGroup.appendChild(questionMinLengthLabel);
      questionMinLengthGroup.appendChild(questionMinLengthField);
      details.appendChild(questionMinLengthGroup);
      saveFormItem(questionMinLengthField.name, questionMinLengthField.value);

      const questionMaxLengthField = document.createElement("input");
      questionMaxLengthField.type = "number";
      questionMaxLengthField.name = `question_max_${data.key}`;
      questionMaxLengthField.id = questionMaxLengthField.name;
      if (data.max) {
        questionMaxLengthField.value = data.max;
      }
      const questionMaxLengthLabel = document.createElement("label");
      questionMaxLengthLabel.innerText = "Question max length:";
      questionMaxLengthLabel.htmlFor = questionMaxLengthField.name;
      const questionMaxLengthGroup = document.createElement("div");
      questionMaxLengthGroup.classList.add("form-group");
      questionMaxLengthGroup.appendChild(questionMaxLengthLabel);
      questionMaxLengthGroup.appendChild(questionMaxLengthField);
      details.appendChild(questionMaxLengthGroup);
      saveFormItem(questionMaxLengthField.name, questionMaxLengthField.value);

      const questionDefaultField = document.createElement("input");
      questionDefaultField.type = "text";
      questionDefaultField.name = `question_default_${data.key}`;
      questionDefaultField.id = questionDefaultField.name;
      if (data.default) {
        questionDefaultField.value = data.default;
      }
      const questionDefaultLabel = document.createElement("label");
      questionDefaultLabel.innerText = "Question default value:";
      questionDefaultLabel.htmlFor = questionDefaultField.name;
      const questionDefaultGroup = document.createElement("div");
      questionDefaultGroup.classList.add("form-group");
      questionDefaultGroup.appendChild(questionDefaultLabel);
      questionDefaultGroup.appendChild(questionDefaultField);
      details.appendChild(questionDefaultGroup);
      saveFormItem(questionDefaultField.name, questionDefaultField.value);
      break;
    }

    case QuestionType.TEXTAREA: {
      const questionMinLengthField = document.createElement("input");
      questionMinLengthField.type = "number";
      questionMinLengthField.name = `question_min_${data.key}`;
      questionMinLengthField.id = questionMinLengthField.name;
      if (data.min) {
        questionMinLengthField.value = data.min;
      }
      const questionMinLengthLabel = document.createElement("label");
      questionMinLengthLabel.innerText = "Question min length:";
      questionMinLengthLabel.htmlFor = questionMinLengthField.name;
      const questionMinLengthGroup = document.createElement("div");
      questionMinLengthGroup.classList.add("form-group");
      questionMinLengthGroup.appendChild(questionMinLengthLabel);
      questionMinLengthGroup.appendChild(questionMinLengthField);
      details.appendChild(questionMinLengthGroup);
      saveFormItem(questionMinLengthField.name, questionMinLengthField.value);

      const questionMaxLengthField = document.createElement("input");
      questionMaxLengthField.type = "number";
      questionMaxLengthField.name = `question_max_${data.key}`;
      questionMaxLengthField.id = questionMaxLengthField.name;
      if (data.max) {
        questionMaxLengthField.value = data.max;
      }
      const questionMaxLengthLabel = document.createElement("label");
      questionMaxLengthLabel.innerText = "Question max length:";
      questionMaxLengthLabel.htmlFor = questionMaxLengthField.name;
      const questionMaxLengthGroup = document.createElement("div");
      questionMaxLengthGroup.classList.add("form-group");
      questionMaxLengthGroup.appendChild(questionMaxLengthLabel);
      questionMaxLengthGroup.appendChild(questionMaxLengthField);
      details.appendChild(questionMaxLengthGroup);
      saveFormItem(questionMaxLengthField.name, questionMaxLengthField.value);

      const questionDefaultField = document.createElement("input");
      questionDefaultField.type = "text";
      questionDefaultField.name = `question_default_${data.key}`;
      questionDefaultField.id = questionDefaultField.name;
      if (data.default) {
        questionDefaultField.value = data.default;
      }
      const questionDefaultLabel = document.createElement("label");
      questionDefaultLabel.innerText = "Question default value:";
      questionDefaultLabel.htmlFor = questionDefaultField.name;
      const questionDefaultGroup = document.createElement("div");
      questionDefaultGroup.classList.add("form-group");
      questionDefaultGroup.appendChild(questionDefaultLabel);
      questionDefaultGroup.appendChild(questionDefaultField);
      details.appendChild(questionDefaultGroup);
      saveFormItem(questionDefaultField.name, questionDefaultField.value);

      const questionPlaceholderField = document.createElement("input");
      questionPlaceholderField.type = "text";
      questionPlaceholderField.name = `question_placeholder_${data.key}`;
      questionPlaceholderField.id = questionPlaceholderField.name;
      if (data.placeholder) {
        questionPlaceholderField.value = data.placeholder;
      }
      const questionPlaceholderLabel = document.createElement("label");
      questionPlaceholderLabel.innerText = "Question placeholder:";
      questionPlaceholderLabel.htmlFor = questionPlaceholderField.name;
      const questionPlaceholderGroup = document.createElement("div");
      questionPlaceholderGroup.classList.add("form-group");
      questionPlaceholderGroup.appendChild(questionPlaceholderLabel);
      questionPlaceholderGroup.appendChild(questionPlaceholderField);
      details.appendChild(questionPlaceholderGroup);
      saveFormItem(
        questionPlaceholderField.name,
        questionPlaceholderField.value,
      );
      break;
    }

    case QuestionType.CHECKBOX: {
      const questionDefaultField = document.createElement("input");
      questionDefaultField.type = "checkbox";
      questionDefaultField.name = `question_default_${data.key}`;
      questionDefaultField.id = questionDefaultField.name;
      if (data.default) {
        questionDefaultField.checked = true;
      }
      const questionDefaultLabel = document.createElement("label");
      questionDefaultLabel.innerText = "Question default value:";
      questionDefaultLabel.htmlFor = questionDefaultField.name;
      const questionDefaultGroup = document.createElement("div");
      questionDefaultGroup.classList.add("form-group");
      questionDefaultGroup.appendChild(questionDefaultLabel);
      questionDefaultGroup.appendChild(questionDefaultField);
      details.appendChild(questionDefaultGroup);
      saveFormItem(questionDefaultField.name, questionDefaultField.checked);
      break;
    }

    case QuestionType.COLOR: {
      const questionDefaultField = document.createElement("input");
      questionDefaultField.type = "color";
      questionDefaultField.name = `question_default_${data.key}`;
      questionDefaultField.id = questionDefaultField.name;
      if (data.default) {
        questionDefaultField.value = data.default;
      }
      const questionDefaultLabel = document.createElement("label");
      questionDefaultLabel.innerText = "Question default value:";
      questionDefaultLabel.htmlFor = questionDefaultField.name;
      const questionDefaultGroup = document.createElement("div");
      questionDefaultGroup.classList.add("form-group");
      questionDefaultGroup.appendChild(questionDefaultLabel);
      questionDefaultGroup.appendChild(questionDefaultField);
      details.appendChild(questionDefaultGroup);
      saveFormItem(questionDefaultField.name, questionDefaultField.value);
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

      // Remove from local storage.
      Object.keys(localStorage).forEach((key) => {
        if (key.endsWith(data.key)) {
          localStorage.removeItem(key);
        }
      });
    }
  });
  question.appendChild(deleteButton);
  questionsContainer.appendChild(question);
}

// TODO: Define Difflint annotation for QuestionType in `form/form.py`.
const QuestionType = {
  NUMBER: "number",
  SINGLE_TEXT_SELECT: "single_text_select",
  TEXT: "text",
  TEXTAREA: "textarea",
  CHECKBOX: "checkbox",
  COLOR: "color",
};

const QUESTION_LEGENDS = {
  [QuestionType.NUMBER]: "Number",
  [QuestionType.SINGLE_TEXT_SELECT]: "Single text select",
  [QuestionType.TEXT]: "Text",
  [QuestionType.TEXTAREA]: "Textarea",
  [QuestionType.CHECKBOX]: "Checkbox",
  [QuestionType.COLOR]: "Color",
};

function saveFormItem(key, value) {
  localStorage.setItem(`${FORM_ID}_${key}`, value);
}

function readFormItem(key) {
  return localStorage.getItem(`${FORM_ID}_${key}`);
}

function readFormItems() {
  const questions = Object.entries(localStorage).filter(([name]) =>
    name.startsWith(`${FORM_ID}_question_type_`)
  );

  const questionList = questions.map(([name, value]) => {
    const key = name.replace(`${FORM_ID}_question_type_`, "");
    return {
      key,
      type: value,
      name: readFormItem(`question_name_${key}`),
      content: readFormItem(`question_content_${key}`),
      required: readFormItem(`question_required_${key}`) === "on",
      min: readFormItem(`question_min_${key}`),
      max: readFormItem(`question_max_${key}`),
      step: readFormItem(`question_step_${key}`),
      default: readFormItem(`question_default_${key}`),
      placeholder: readFormItem(`question_placeholder_${key}`),
      choices: readFormItem(`question_choices_${key}`),
      custom_choice: readFormItem(`question_custom_choice_${key}`),
      default_choice: readFormItem(`question_default_choice_${key}`),
      default_custom_choice: readFormItem(
        `question_default_custom_choice_${key}`,
      ),
    };
  });

  return questionList;
}

const FORM_ID = location.pathname.split("/")[2];
