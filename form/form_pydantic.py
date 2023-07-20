from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional
from datetime import datetime


class QuestionType(Enum):
    """Enum for keeping track of question types."""

    NUMBER = "number"
    SINGLE_TEXT_SELECT = "single_text_select"
    TEXT = "text"
    TEXTAREA = "textarea"
    CHECKBOX = "checkbox"
    COLOR = "color"


class Question(BaseModel):
    type: QuestionType
    name: str
    content: str
    required: bool


class SingleTextSelectQuestion(Question):
    type = QuestionType.SINGLE_TEXT_SELECT
    choices: list[str]
    custom_choice: bool
    default_choice: Optional[int]
    default_custom_choice: Optional[str]


class NumberQuestion(Question):
    type = QuestionType.NUMBER
    min: Optional[int]
    max: Optional[int]
    default: Optional[int]
    placeholder: Optional[str]


class TextQuestion(Question):
    type = QuestionType.TEXT
    default: Optional[str]
    placeholder: Optional[str]
    min_length: Optional[int]
    max_length: Optional[int]
    pattern: Optional[str]
    placeholder: Optional[str]


class TextareaQuestion(Question):
    type = QuestionType.TEXTAREA
    default: Optional[str]
    min_length: Optional[int]
    max_length: Optional[int]
    placeholder: Optional[str]


class CheckboxQuestion(Question):
    type = QuestionType.CHECKBOX
    default: Optional[list[str]]


class ColorQuestion(Question):
    default: Optional[str]
    type = QuestionType.COLOR


class QuestionList(BaseModel):
    fields: list[Question]
    shuffled: bool


class DiscordMessage(BaseModel):
    id: Optional[int]
    webhook_url: str
    content: str
    timestamp: Optional[datetime]


class Form(BaseModel):
    id: str
    questions: Optional[QuestionList]
    linked_discord_message: Optional[DiscordMessage]
