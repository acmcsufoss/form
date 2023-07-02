from dataclasses import dataclass
from enum import Enum


class FormFieldType(Enum):
    """Enum for keeping track of form field types."""

    SINGLE_SELECT = "single_select"
    MULTIPLE_SELECT = "multiple_select"
    NUMBER = "number"
    TEXT = "text"
    TEXTAREA = "textarea"
    CHECKBOX = "checkbox"
    DATE = "date"
    TIME = "time"
    DATE_TIME = "date_time"
    TEL = "tel"
    COLOR = "color"
    URL = "url"
    FILE = "file"


@dataclass
class FormField:
    """Class for keeping track of an item in a form."""

    # type is the type of form field.
    type: FormFieldType

    # question is the markdown question content for the form field.
    question: str

    # required is whether or not the form field is required.
    required: bool


@dataclass
class PatternedFormField(FormField):
    """
    Class for keeping track of a patterned form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern
    """

    # pattern is the regex pattern for the text.
    pattern: str | None


@dataclass
class PlaceheldFormField(FormField):
    """
    Class for keeping track of a placeheld form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder
    """

    # placeholder is the placeholder for the text.
    placeholder: str | None


@dataclass
class SingleSelectFormField(FormField):
    """Class for keeping track of a single select form field."""

    # type is the FormFieldType.SINGLE_SELECT type.
    type: FormFieldType.SINGLE_SELECT

    # choices are the choices for the form field.
    choices: list[str]

    # custom_choice is whether or not the form field allows custom choices.
    custom_choice: bool

    # default_choice is the default choice for the form field.
    default_choice: int | None

    # default_custom_choice is the default custom choice for the form field.
    default_custom_choice: str | None


@dataclass
class MultipleSelectFormField(FormField):
    """Class for keeping track of a multiple select form field."""

    # type is the FormFieldType.MULTIPLE_SELECT type.
    type: FormFieldType.MULTIPLE_SELECT

    # choices are the choices for the form field.
    choices: list[str]

    # custom_choices is the number of custom choices allowed for the form field.
    custom_choices: int

    # default_choices are the default choices for the form field.
    default_choices: list[int] | None

    # default_custom_choices are the default custom choices for the form field.
    default_custom_choices: list[str] | None


@dataclass
class NumberFormField(PlaceheldFormField):
    """
    Class for keeping track of a number form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
    """

    # type is the FormFieldType.NUMBER type.
    type: FormFieldType.NUMBER

    # min is the minimum value for the number.
    min: int | None

    # max is the maximum value for the number.
    max: int | None

    # step is the step value for the number.
    step: int | None

    # default is the default value for the number.
    default: int | None


@dataclass
class TextFormField(PatternedFormField, PlaceheldFormField):
    """
    Class for keeping track of a text form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
    """

    # type is the FormFieldType.TEXT type.
    type: FormFieldType.TEXT

    # min_length is the minimum length for the text.
    min_length: int | None

    # max_length is the maximum length for the text.
    max_length: int | None

    # default is the default value for the text.
    default: str | None


@dataclass
class TextareaFormField(PlaceheldFormField):
    """
    Class for keeping track of a textarea form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
    """

    # type is the FormFieldType.TEXTAREA type.
    type: FormFieldType.TEXTAREA

    # min_length is the minimum length for the textarea.
    min_length: int | None

    # max_length is the maximum length for the textarea.
    max_length: int | None

    # default is the default value for the textarea.
    default: str | None


@dataclass
class CheckboxFormField(FormField):
    """
    Class for keeping track of a checkbox form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
    """

    # type is the FormFieldType.CHECKBOX type.
    type: FormFieldType.CHECKBOX

    # default is the default value for the checkbox.
    default: bool


@dataclass
class DateFormField(FormField):
    """
    Class for keeping track of a date form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
    """

    # type is the FormFieldType.DATE type.
    type: FormFieldType.DATE

    # min is the minimum value for the date.
    min: str | None

    # max is the maximum value for the date.
    max: str | None

    # default is the default value for the date.
    default: str | None


@dataclass
class TimeFormField(FormField):
    """
    Class for keeping track of a time form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time
    """

    # type is the FormFieldType.TIME type.
    type: FormFieldType.TIME

    # min is the minimum value for the time.
    min: str | None

    # max is the maximum value for the time.
    max: str | None

    # default is the default value for the time.
    default: str | None


@dataclass
class DatetimeFormField(DateFormField, TimeFormField):
    """
    Class for keeping track of a datetime form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local"""

    # type is the FormFieldType.DATE_TIME type.
    type: FormFieldType.DATE_TIME


@dataclass
class FileFormField(FormField):
    """
    Class for keeping track of a [multiple] file form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
    """

    # type is the FormFieldType.FILE type.
    type: FormFieldType.FILE

    # accept is the accepted file types for the file.
    accept: list[str] | None

    # multiple is whether or not the file accepts multiple files.
    multiple: bool

    # default is the default URL list of file(s) for the file.
    default: list[str] | None


@dataclass
class TelFormField(PatternedFormField, PlaceheldFormField):
    """
    Class for keeping track of a telephone number form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel
    """

    # type is the FormFieldType.TEL type.
    type: FormFieldType.TEL

    # default is the default value for the tel.
    default: str | None


@dataclass
class URLFormField(PatternedFormField, PlaceheldFormField):
    """
    Class for keeping track of a URL form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url
    """

    # type is the FormFieldType.URL type.
    type: FormFieldType.URL

    # default is the default value for the URL.
    default: str | None


@dataclass
class ColorFormField(FormField):
    """
    Class for keeping track of a color form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
    """

    # type is the FormFieldType.COLOR type.
    type: FormFieldType.COLOR

    # default is the default value for the color.
    default: str | None


@dataclass
class Form:
    """
    Class for keeping track of a form.
    """

    # id is the ID of the form.
    id: str

    # items is the list of form items for the form.
    items: list[FormField]

    # linked_sheet_id is the ID of the linked Google Sheets sheet for the responses
    # to the form.
    linked_sheet_id: str | None

    # discord_message_content is the content of the Discord message
    # representation of the form.
    discord_message_content: str

    # discord_message_id is the ID of the Discord message representation of the
    # form.
    discord_message_id: str

    # discord_channel_id is the ID of the Discord channel that the Discord
    # message representation of the form is in.
    discord_channel_id: str

    # discord_guild_id is the ID of the Discord guild that the Discord channel
    # that the Discord message representation of the form is in.
    discord_guild_id: str
