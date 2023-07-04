document.addEventListener("DOMContentLoaded", () => {
  const formForm = document.querySelector(".form-form");
  if (!formForm) {
    return;
  }

  // Add event listener to save form data when it changes.
  formForm.addEventListener("change", (event) => {
    const name = event.target.name;
    if (!name.startsWith("question_")) {
      return;
    }

    const value = event.target.value;
    if (!value) {
      return;
    }

    // Save the input element's value to local storage by its name.
    localStorage.setItem(name, value);
    console.info(`Saved ${name} (${value}) to local storage.`);
  });

  // Load form data from local storage by reading all input elements' values
  // and setting them to the values from local storage.
  const inputs = formForm.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    const stored = localStorage.getItem(input.name);
    if (stored) {
      input.value = stored;
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

function addAddQuestionForm() {
  const addQuestionContainer = document.querySelector(".add-question");
  if (!addQuestionContainer) {
    return;
  }

  const addQuestionForm = document.createElement("form");

  // Add question type select to choose which type of question to add.
  const questionTypeSelect = document.createElement("select");
  Object.entries(QuestionType).forEach((value, name) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = name;
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
}

/**
 * @param {Question | undefined} data
 */
function addQuestion(data) {
  const questionsContainer = document.querySelector(".questions");
  data ||= {
    key: Math.random().toString(36).substring(2, 15),
  };

  data.type = document.querySelector("select")?.value;
  if (!data.type || !(data.type in QuestionType)) {
    return;
  }

  const question = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.innerText = QUESTION_LEGENDS[data.type];
  question.appendChild(legend);

  const questionTypeField = document.createElement("input");
  questionTypeField.type = "hidden";
  questionTypeField.name = `question_type_${data.key}`;
  questionTypeField.value = data.type;
  question.appendChild(questionTypeField);

  const questionNameField = document.createElement("input");
  questionNameField.name = `question_name_${data.key}`;
  if (data.name) {
    questionNameField.value = data.name;
  }
  question.appendChild(questionNameField);

  const questionContentField = document.createElement("textarea");
  questionContentField.name = `question_content_${data.key}`;
  if (data.content) {
    questionContentField.value = data.content;
  }
  question.appendChild(questionContentField);

  const questionRequiredField = document.createElement("input");
  questionRequiredField.type = "checkbox";
  questionRequiredField.name = `question_required_${data.key}`;
  if (data.required) {
    questionRequiredField.checked = true;
  }
  question.appendChild(questionRequiredField);

  switch (questionType) {
    case QuestionType.NUMBER: {
      const questionMinField = document.createElement("input");
      questionMinField.type = "number";
      questionMinField.name = `question_min_${data.key}`;
      if (data.min) {
        questionMinField.value = data.min;
      }
      question.appendChild(questionMinField);

      const questionMaxField = document.createElement("input");
      questionMaxField.type = "number";
      questionMaxField.name = `question_max_${data.key}`;
      if (data.max) {
        questionMaxField.value = data.max;
      }
      question.appendChild(questionMaxField);

      const questionStepField = document.createElement("input");
      questionStepField.type = "number";
      questionStepField.name = `question_step_${data.key}`;
      if (data.step) {
        questionStepField.value = data.step;
      }
      question.appendChild(questionStepField);

      const questionDefaultField = document.createElement("input");
      questionDefaultField.type = "number";
      questionDefaultField.name = `question_default_${data.key}`;
      if (data.default) {
        questionDefaultField.value = data.default;
      }
      question.appendChild(questionDefaultField);

      const questionPlaceholderField = document.createElement("input");
      questionPlaceholderField.type = "text";
      questionPlaceholderField.name = `question_placeholder_${data.key}`;
      if (data.placeholder) {
        questionPlaceholderField.value = data.placeholder;
      }
      question.appendChild(questionPlaceholderField);
      break;
    }

    case QuestionType.SINGLE_TEXT_SELECT: {
      const questionChoicesField = document.createElement("textarea");
      questionChoicesField.name = `question_choices_${data.key}`;
      questionChoicesField.placeholder = "Choice 1\nChoice 2\nChoice 3\n...";
      if (data.choices) {
        questionChoicesField.innerText = data.choices;
      }
      question.appendChild(questionChoicesField);

      const questionCustomChoiceField = document.createElement("input");
      questionCustomChoiceField.type = "checkbox";
      questionCustomChoiceField.name = `question_custom_choice_${data.key}`;
      if (data.custom_choice) {
        questionCustomChoiceField.checked = true;
      }
      question.appendChild(questionCustomChoiceField);

      const questionDefaultChoiceField = document.createElement("input");
      questionDefaultChoiceField.type = "number";
      questionDefaultChoiceField.placeholder = "Default choice index";
      questionDefaultChoiceField.name = `question_default_choice_${data.key}`;
      if (data.default_choice) {
        questionDefaultChoiceField.value = data.default_choice;
      }
      question.appendChild(questionDefaultChoiceField);

      const questionDefaultCustomChoiceField = document.createElement("input");
      questionDefaultCustomChoiceField.type = "text";
      questionDefaultCustomChoiceField.placeholder = "Default custom choice";
      questionDefaultCustomChoiceField.name = `question_default_custom_choice_${data.key}`;
      if (data.default_custom_choice) {
        questionDefaultCustomChoiceField.value = data.default_custom_choice;
      }
      question.appendChild(questionDefaultCustomChoiceField);
      break;
    }

    case QuestionType.TEXT: {
      const questionMinLengthField = document.createElement("input");
      questionMinLengthField.type = "number";
      questionMinLengthField.name = `question_min_${data.key}`;
      if (data.min) {
        questionMinLengthField.value = data.min;
      }
      question.appendChild(questionMinLengthField);

      const questionMaxLengthField = document.createElement("input");
      questionMaxLengthField.type = "number";
      questionMaxLengthField.name = `question_max_${data.key}`;
      if (data.max) {
        questionMaxLengthField.value = data.max;
      }
      question.appendChild(questionMaxLengthField);

      const questionDefaultField = document.createElement("input");
      questionDefaultField.type = "text";
      questionDefaultField.name = `question_default_${data.key}`;
      if (data.default) {
        questionDefaultField.value = data.default;
      }
      question.appendChild(questionDefaultField);
    }

    case QuestionType.TEXTAREA: {
      const questionMinLengthField = document.createElement("input");
      questionMinLengthField.type = "number";
      questionMinLengthField.name = `question_min_${data.key}`;
      if (data.min) {
        questionMinLengthField.value = data.min;
      }
      question.appendChild(questionMinLengthField);

      const questionMaxLengthField = document.createElement("input");
      questionMaxLengthField.type = "number";
      questionMaxLengthField.name = `question_max_${data.key}`;
      if (data.max) {
        questionMaxLengthField.value = data.max;
      }
      question.appendChild(questionMaxLengthField);

      const questionDefaultField = document.createElement("input");
      questionDefaultField.type = "text";
      questionDefaultField.name = `question_default_${data.key}`;
      if (data.default) {
        questionDefaultField.value = data.default;
      }
      question.appendChild(questionDefaultField);

      const questionPlaceholderField = document.createElement("input");
      questionPlaceholderField.type = "text";
      questionPlaceholderField.name = `question_placeholder_${data.key}`;
      if (data.placeholder) {
        questionPlaceholderField.value = data.placeholder;
      }
      question.appendChild(questionPlaceholderField);
      break;
    }

    case QuestionType.CHECKBOX: {
      const questionDefaultField = document.createElement("input");
      questionDefaultField.type = "checkbox";
      questionDefaultField.name = `question_default_${data.key}`;
      if (data.default) {
        questionDefaultField.checked = true;
      }
      question.appendChild(questionDefaultField);
      break;
    }

    case QuestionType.COLOR: {
      const questionDefaultField = document.createElement("input");
      questionDefaultField.type = "color";
      questionDefaultField.name = `question_default_${data.key}`;
      if (data.default) {
        questionDefaultField.value = data.default;
      }
      question.appendChild(questionDefaultField);
      break;
    }

    default: {
      break;
    }
  }

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();

    const confirmed = confirm("Are you sure you want to delete this question?");
    if (confirmed) {
      question.remove();
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
