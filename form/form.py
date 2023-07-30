from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional, Literal, ClassVar
from datetime import datetime
import random
import uuid


class QuestionType(Enum):
    """Enum for keeping track of question types."""

    NUMBER = "number"
    SINGLE_TEXT_SELECT = "single_text_select"
    TEXT = "text"
    TEXTAREA = "textarea"
    CHECKBOX = "checkbox"
    COLOR = "color"


class Question(BaseModel):
    """
    Class for keeping track of a question.
    """

    # type is the type of form field.
    type: QuestionType

    # name is the name of the form field.
    name: str

    # content is the markdown question content for the form field.
    content: str

    # required is whether or not the form field is required.
    required: bool


class SingleTextSelectQuestion(Question):
    """
    Class for keeping track of a single text select question.
    """

    # type is the type of form field.
    type: QuestionType = QuestionType.SINGLE_TEXT_SELECT

    # choices is the list of choices for the form field.
    choices: list[str]

    # custom_choice is whether or not the form field has a custom choice.
    custom_choice: bool

    # default_choice is the default choice for the form field.
    default_choice: Optional[int]

    # default_custom_choice is the default custom choice for the form field.
    default_custom_choice: Optional[str]


class NumberQuestion(Question):

    """
    Class for keeping track of a number question.
    """

    # type is the type of form field.
    type: QuestionType = QuestionType.NUMBER

    # min is the minimum value for the number.
    min: Optional[int]

    # max is the maximum value for the number.
    max: Optional[int]

    # default is the default value for the number.
    default: Optional[int]

    # placeholder is the placeholder value for the number.
    placeholder: Optional[str]

    # step is the step value for the number.
    step: Optional[int]


class TextQuestion(Question):
    """
    Class for keeping track of a text question.
    """

    # type is the type of form field.
    type: QuestionType = QuestionType.TEXT

    # default is the default value for the text.
    default: Optional[str]

    # placeholder is the placeholder value for the text.
    placeholder: Optional[str]

    # min_length is the minimum length for the text.
    min_length: Optional[int]

    # max_length is the maximum length for the text.
    max_length: Optional[int]

    # pattern is the regex pattern for the text.
    pattern: Optional[str]


class TextareaQuestion(Question):
    """
    Class for keeping track of a textarea question.
    """

    # type is the type of form field.
    type: QuestionType = QuestionType.TEXTAREA

    # default is the default value for the text area.
    default: Optional[str]

    # min_length is the minimum length for the text area.
    min_length: Optional[int]

    # max_length is the maximum length for the text area.
    max_length: Optional[int]

    # placeholder is the placeholder value for the text area.
    placeholder: Optional[str]


class CheckboxQuestion(Question):
    """
    Class for keeping track of a checkbox question.
    """

    # type is the type of form field.
    type: QuestionType = QuestionType.CHECKBOX

    # default is the default value for the checkbox.
    default: bool


class ColorQuestion(Question):
    """
    Class for keeping track of a color form field.
    """

    # type is the type of form field.
    type: QuestionType = QuestionType.COLOR

    # default is the default value for the color input.
    default: Optional[str]


class QuestionList(BaseModel):
    """
    Class for keeping track of a list of questions.
    """

    # data is the list of questions.
    data: list[Question]

    # shuffled is whether or not the questions are shuffled.
    shuffled: bool


class DiscordMessage(BaseModel):
    """
    Class for keeping track of a Discord message.
    """

    # id is the ID of the Discord message that the form is linked to (if any).
    id: Optional[str]

    # webhook_url is the webhook URL of the Discord message.
    webhook_url: str

    # content is the Discord message content.
    content: str

    # timestamp is the Discord message timestamp.
    timestamp: Optional[datetime]


class Form(BaseModel):
    """
    Class for keeping track of a form.
    """

    # id is the form ID.
    id: str

    # questions is the list of questions for the form.
    questions: Optional[QuestionList]

    # linked_discord_message is the Discord message that the form is linked to.
    linked_discord_message: Optional[DiscordMessage]


class FormMap(BaseModel):
    """
    Class for keeping track of a map of forms.
    """

    # data is the map of forms.
    data: dict[str, Form]


def get_questions(f: Form) -> list[Question]:
    """
    get_questions returns the list of questions.
    """
    if f.questions is None:
        return []

    if f.questions.shuffled:
        return random.sample(f.questions.data, len(f.questions.data))

    return f.questions.data
