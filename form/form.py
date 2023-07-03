from dataclasses import dataclass
from enum import Enum
import random


class FormFieldType(Enum):
    """Enum for keeping track of form field types."""

    SINGLE_SELECT = "single_select"
    MULTIPLE_SELECT = "multiple_select"
    FIELDSET = "fieldset"
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

    def __init__(
        self,
        type: FormFieldType,
        question: str,
        required: bool | None = False,
    ):
        self.type = type
        self.question = question
        self.required = required

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

    def __init__(
        self,
        type: FormFieldType,
        question: str,
        required: bool | None = False,
        pattern: str | None = None,
    ):
        super().__init__(type, question, required)
        self.pattern = pattern

    # pattern is the regex pattern for the text.
    pattern: str | None


@dataclass
class PlaceheldFormField(FormField):
    """
    Class for keeping track of a placeheld form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder
    """

    def __init__(
        self,
        type: FormFieldType,
        question: str,
        required: bool | None = False,
        placeholder: str | None = None,
    ):
        super().__init__(type, question, required)
        self.placeholder = placeholder

    # placeholder is the placeholder for the text.
    placeholder: str | None


@dataclass
class SingleSelectFormField(FormField):
    """Class for keeping track of a single select form field."""

    def __init__(
        self,
        question: str,
        choices: list[str],
        custom_choice: bool = False,
        default_choice: int | None = None,
        default_custom_choice: str | None = None,
        required: bool | None = False,
    ):
        super().__init__(FormFieldType.SINGLE_SELECT, question, required)
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
class MultipleSelectFormField(FormField):
    """Class for keeping track of a multiple select form field."""

    def __init__(
        self,
        question: str,
        choices: list[str],
        custom_choices: int = 1,
        default_choices: list[int] | None = None,
        default_custom_choices: list[str] | None = None,
        required: bool | None = False,
    ):
        super().__init__(FormFieldType.MULTIPLE_SELECT, question, required)
        self.choices = choices
        self.custom_choices = custom_choices
        self.default_choices = default_choices
        self.default_custom_choices = default_custom_choices

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

    def __init__(
        self,
        question: str,
        min: int | None = None,
        max: int | None = None,
        step: int | None = None,
        default: int | None = None,
        required: bool | None = False,
        placeholder: str | None = None,
    ):
        super().__init__(FormFieldType.NUMBER, question, required, placeholder)
        self.min = min
        self.max = max
        self.step = step
        self.default = default

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

    def __init__(
        self,
        question: str,
        min_length: int | None = None,
        max_length: int | None = None,
        default: str | None = None,
        required: bool | None = False,
        pattern: str | None = None,
        placeholder: str | None = None,
    ):
        super().__init__(FormFieldType.TEXT, question, required, pattern)
        self.min_length = min_length
        self.max_length = max_length
        self.default = default
        self.placeholder = placeholder

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

    def __init__(
        self,
        question: str,
        min_length: int | None = None,
        max_length: int | None = None,
        default: str | None = None,
        required: bool | None = False,
        placeholder: str | None = None,
    ):
        super().__init__(FormFieldType.TEXTAREA, question, required, placeholder)
        self.min_length = min_length
        self.max_length = max_length
        self.default = default

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

    def __init__(
        self,
        question: str,
        default: bool,
        required: bool | None = False,
    ):
        super().__init__(FormFieldType.CHECKBOX, question, required)
        self.default = default

    # default is the default value for the checkbox.
    default: bool


@dataclass
class DateFormField(FormField):
    """
    Class for keeping track of a date form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
    """

    def __init__(
        self,
        question: str,
        min: str | None = None,
        max: str | None = None,
        default: str | None = None,
        required: bool | None = False,
    ):
        super().__init__(FormFieldType.DATE, question, required)
        self.min = min
        self.max = max
        self.default = default

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

    def __init__(
        self,
        question: str,
        min: str | None = None,
        max: str | None = None,
        default: str | None = None,
        required: bool | None = False,
    ):
        super().__init__(FormFieldType.TIME, question, required)
        self.min = min
        self.max = max
        self.default = default

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
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
    """

    def __init__(
        self,
        question: str,
        min: str | None = None,
        max: str | None = None,
        default: str | None = None,
        required: bool | None = False,
    ):
        super().__init__(question, min, max, default, required)

    # type is the FormFieldType.DATE_TIME type.
    type: FormFieldType = FormFieldType.DATE_TIME


@dataclass
class FileFormField(FormField):
    """
    Class for keeping track of a [multiple] file form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
    """

    def __init__(
        self,
        question: str,
        accept: list[str] | None = None,
        multiple: bool = False,
        default: list[str] | None = None,
        required: bool | None = False,
    ):
        super().__init__(FormFieldType.FILE, question, required)
        self.accept = accept
        self.multiple = multiple
        self.default = default

    # accept is the file types accepted by the file input.
    accept: list[str] | None

    # multiple is whether or not multiple files can be selected.
    multiple: bool

    # default is the default value for the file input.
    default: list[str] | None


@dataclass
class TelFormField(PatternedFormField, PlaceheldFormField):
    """
    Class for keeping track of a tel form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel
    """

    def __init__(
        self,
        question: str,
        default: str | None = None,
        required: bool | None = False,
        pattern: str | None = None,
        placeholder: str | None = None,
    ):
        super().__init__(FormFieldType.TEL, question, required, pattern)
        self.placeholder = placeholder
        self.default = default

    # default is the default value for the tel input.
    default: str | None


@dataclass
class ColorFormField(FormField):
    """
    Class for keeping track of a color form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
    """

    def __init__(
        self,
        question: str,
        default: str | None = None,
        required: bool | None = False,
    ):
        super().__init__(FormFieldType.COLOR, question, required)
        self.default = default

    # default is the default value for the color input.
    default: str | None


@dataclass
class URLFormField(PatternedFormField, PlaceheldFormField):
    """
    Class for keeping track of a url form field.

    See:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url
    """

    def __init__(
        self,
        question: str,
        default: str | None = None,
        required: bool | None = False,
        pattern: str | None = None,
        placeholder: str | None = None,
    ):
        super().__init__(FormFieldType.URL, question, required, pattern)
        self.placeholder = placeholder
        self.default = default

    # default is the default value for the url input.
    default: str | None


@dataclass
class Fieldset:
    """
    Class for keeping track of a fieldset.
    """

    def __init__(
        self,
        fields: list[FormField],
        shuffled: bool = False,
    ):
        self.fields = fields
        self.shuffled = shuffled

    # fields is the list of form fields for the fieldset.
    fields: list[FormField]

    # shuffled is whether or not the fieldset is shuffled.
    shuffled: bool

    # get_fields returns the list of form fields for the fieldset.
    def get_fields(self) -> list[FormField]:
        if self.shuffled:
            return random.sample(self.fields, len(self.fields))

        return self.fields


@dataclass
class FieldsetFormField(FormField):
    """
    Class for keeping track of a fieldset form field.
    """

    def __init__(
        self,
        question: str,
        fieldset: Fieldset,
        required: bool = False,
        max: int = 1,
    ):
        super().__init__(FormFieldType.FIELDSET, question, required)
        self.fieldset = fieldset
        self.max = max

    # fieldset is the fieldset of the fieldset form field.
    fieldset: Fieldset

    # max is the maximum number of times the fieldset can be repeated.
    max: int


@dataclass
class Form:
    """
    Class for keeping track of a form.
    """

    # id is the ID of the form.
    id: str

    # fieldset is the fieldset of the form.
    fieldset: Fieldset

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


# overwrite_default_responses: bool = False

# I will make a recursive form field groups system where in the case that i need
# to make instances of a form incrementally, i can do so by making a form field.

# The way to add a new subform is by subform link. They just click it and they navigate to it.
# When they go back to the main form, the subform is added to the main form where they can delete it or add more subforms.
# When they delete a subform, they are asked to confirm the deletion and can even undo the deletion until the submission. Unless the form is able to be edited after submisssion.
# The subform codes are stored somewhere to verify that a subform id is valid without storing it in a db.
