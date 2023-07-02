from dataclasses import dataclass
from enum import Enum

# See:
# https://pkg.go.dev/google.golang.org/api/forms/v1#Form
class FormFieldType(Enum):
    CHOICE = "choice"
    NUMBER = "number"
    CHECKBOX = "checkbox"


# See:
# https://pkg.go.dev/google.golang.org/api/forms/v1#Grading
@dataclass
class Grading:
    """Class for keeping track of grading."""
    


@dataclass
class FormField:
    """Class for keeping track of an item in a form."""

    type: FormFieldType
    required: bool
    grading: Grading


@dataclass
class Form:
    """Class for keeping track of a form."""

    items: list[FormField]


