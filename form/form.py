from dataclasses import dataclass
from enum import Enum
import random


class QuestionType(Enum):
    """Enum for keeping track of question types."""

    NUMBER = "number"
    SINGLE_TEXT_SELECT = "single_text_select"
    TEXT = "text"
    TEXTAREA = "textarea"
    CHECKBOX = "checkbox"
    COLOR = "color"


@dataclass
class Question:
    """
    Class for keeping track of a question.
    """

    def __init__(
        self,
        type: QuestionType,
        name: str,
        content: str,
        required: bool | None = False,
    ):
        self.type = type
        self.name = name
        self.content = content
        self.required = required

    # type is the type of form field.
    type: QuestionType

    # name is the name of the form field.
    name: str

    # content is the markdown question content for the form field.
    content: str

    # required is whether or not the form field is required.
    required: bool


@dataclass
class SingleTextSelectQuestion(Question):
    """
    Class for keeping track of a single text select question.
    """

    def __init__(
        self,
        name: str,
        question: str,
        choices: list[str],
        custom_choice: bool = False,
        default_choice: int | None = None,
        default_custom_choice: str | None = None,
        required: bool | None = False,
    ):
        super().__init__(QuestionType.SINGLE_TEXT_SELECT, name, question, required)
        self.choices = choices
        self.custom_choice = custom_choice
        self.default_choice = default_choice
        self.default_custom_choice = default_custom_choice

    # choices are the choices for the form field.
    choices: list[str]

    # custom_choice is whether or not the form field allows custom choices.
    custom_choice: bool

    # default_choice is the default choice for the form field.
    default_choice: int | None

    # default_custom_choice is the default custom choice for the form field.
    default_custom_choice: str | None


@dataclass
class NumberQuestion(Question):
    """
    Class for keeping track of a number form question.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
    """

    def __init__(
        self,
        name: str,
        question: str,
        min: int | None = None,
        max: int | None = None,
        step: int | None = None,
        default: int | None = None,
        required: bool | None = False,
        placeholder: str | None = None,
    ):
        super().__init__(QuestionType.NUMBER, name, question, required)
        self.min = min
        self.max = max
        self.step = step
        self.default = default
        self.placeholder = placeholder

    # min is the minimum value for the number.
    min: int | None

    # max is the maximum value for the number.
    max: int | None

    # step is the step value for the number.
    step: int | None

    # default is the default value for the number.
    default: int | None


@dataclass
class TextQuestion(Question):
    """
    Class for keeping track of a text form question.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
    """

    def __init__(
        self,
        name: str,
        question: str,
        min_length: int | None = None,
        max_length: int | None = None,
        default: str | None = None,
        required: bool | None = False,
        pattern: str | None = None,
        placeholder: str | None = None,
    ):
        super().__init__(Question.TEXT, name, question, required)
        self.min_length = min_length
        self.max_length = max_length
        self.default = default
        self.placeholder = placeholder
        self.pattern = pattern

    # min_length is the minimum length for the text.
    min_length: int | None

    # max_length is the maximum length for the text.
    max_length: int | None

    # default is the default value for the text.
    default: str | None


@dataclass
class TextareaQuestion:
    """
    Class for keeping track of a textarea form question.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
    """

    def __init__(
        self,
        name,
        question: str,
        min_length: int | None = None,
        max_length: int | None = None,
        default: str | None = None,
        required: bool | None = False,
        placeholder: str | None = None,
    ):
        super().__init__(QuestionType.TEXTAREA, name, question, required)
        self.min_length = min_length
        self.max_length = max_length
        self.default = default
        self.placeholder = placeholder

    # min_length is the minimum length for the textarea.
    min_length: int | None

    # max_length is the maximum length for the textarea.
    max_length: int | None

    # default is the default value for the textarea.
    default: str | None


@dataclass
class CheckboxQuestion(Question):
    """
    Class for keeping track of a checkbox form question.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
    """

    def __init__(
        self,
        name: str,
        question: str,
        default: bool,
        required: bool | None = False,
    ):
        super().__init__(QuestionType.CHECKBOX, name, question, required)
        self.default = default

    # default is the default value for the checkbox.
    default: bool


@dataclass
class ColorQuestion(Question):
    """
    Class for keeping track of a color form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
    """

    def __init__(
        self,
        name: str,
        question: str,
        default: str | None = None,
        required: bool | None = False,
    ):
        super().__init__(QuestionType.COLOR, name, question, required)
        self.default = default

    # default is the default value for the color input.
    default: str | None


@dataclass
class QuestionList:
    """
    Class for keeping track of a list of questions.
    """

    def __init__(
        self,
        fields: list[Question],
        shuffled: bool = False,
    ):
        self.fields = fields
        self.shuffled = shuffled

    # fields is the list of form fields for the fieldset.
    fields: list[Question]

    # shuffled is whether or not the fieldset is shuffled.
    shuffled: bool

    # get_questions returns the list of questions.
    def get_questions(self) -> list[Question]:
        if self.shuffled:
            return random.sample(self.fields, len(self.fields))

        return self.fields


@dataclass
class DiscordMessage:
    """
    Class for keeping track of a Discord message.
    """

    # content is the content of the Discord message.
    content: str

    # id is the ID of the Discord message that the form is linked to (if any).
    id: str | None

    # channel_id is the ID of the Discord channel that the Discord message is in.
    channel_id: str


@dataclass
class GoogleSheetsSheet:
    """
    Class for keeping track of a Google Sheets sheet.
    """

    # id is the ID of the Google Sheets sheet.
    id: str

    # name is the name of the Google Sheets sheet.
    name: str


@dataclass
class Form:
    """
    Class for keeping track of a form.
    """

    # id is the ID of the form.
    id: str

    # questions is the list of questions for the form.
    questions: QuestionList

    # linked_sheet is the Google Sheets sheet that the form is linked to.
    linked_sheet: GoogleSheetsSheet | None

    # linked_discord_message is the Discord message that the form is linked to.
    linked_discord_message: DiscordMessage | None