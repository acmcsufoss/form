from form import (
    Form,
    FormField,
    TextareaFormField,
    FormFieldType,
    SingleSelectFormField,
    TextFormField,
    CheckboxFormField,
    NumberFormField,
    FieldsetFormField,
    Fieldset,
)


FORM_FIELD_TYPE = SingleSelectFormField(
    question="What type of form field do you want to add?",
    choices=[
        FormFieldType.TEXT,
        FormFieldType.TEXTAREA,
        FormFieldType.NUMBER,
        FormFieldType.CHECKBOX,
        FormFieldType.DATE,
        FormFieldType.TIME,
        FormFieldType.DATE_TIME,
        FormFieldType.TEL,
        FormFieldType.COLOR,
        FormFieldType.URL,
        FormFieldType.FILE,
        FormFieldType.SINGLE_SELECT,
        FormFieldType.MULTIPLE_SELECT,
    ],
)

FORM_FIELD_QUESTION = TextareaFormField(
    question="Markdown question content for the form field.",
)

FORM_FIELD_REQUIRED = CheckboxFormField(
    question="Is this form field required?",
    default=False,
)

CHOICES_FORM_FIELD = FieldsetFormField(
    question="Markdown content for the choices.",
    fieldset=Fieldset(
        fields=[
            TextareaFormField(
                question="Markdown content for the choice.",
                placeholder="Choice 1",
            ),
        ],
    ),
    max=32,
)


SINGLE_SELECT_FORM_FIELD_FORM = Form(
    fields=[
        # SingleSelectFormField.type
        # FORM_FIELD_TYPE,
        # SingleSelectFormField.question
        FORM_FIELD_QUESTION,
        # SingleSelectFormField.required
        FORM_FIELD_REQUIRED,
        # SingleSelectFormField.choices
        CHOICES_FORM_FIELD,
        # SingleSelectFormField.custom_choice
        CheckboxFormField(
            question="Do you want to allow a custom choice?",
            default=False,
        ),
        # SingleSelectFormField.default_choice
        TextareaFormField(
            question="Markdown content for the default choice.",
            placeholder="Choice 1",
        ),
        # SingleSelectFormField.default_custom_choice
        TextareaFormField(
            question="Markdown content for the default custom choice.",
            placeholder="Custom choice",
        ),
    ],
)

MULTIPLE_SELECT_FORM_FIELD_FORM = Form(
    fields=[
        # MultipleSelectFormField.type
        # FORM_FIELD_TYPE,
        # MultipleSelectFormField.question
        FORM_FIELD_QUESTION,
        # MultipleSelectFormField.required
        FORM_FIELD_REQUIRED,
        # MultipleSelectFormField.choices
        CHOICES_FORM_FIELD,
        # MultipleSelectFormField.custom_choices
        NumberFormField(
            question="How many custom choices do you want to allow?",
            default=1,
        ),
        # ...
    ],
)
