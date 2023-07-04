from mistune import html as md2html
from form.form import (
    Form,
    Question,
    SingleTextSelectQuestion,
    NumberQuestion,
    TextQuestion,
    TextareaQuestion,
    CheckboxQuestion,
    ColorQuestion,
)


def render_form_html(form: Form) -> str:
    """
    Render a form as HTML.
    """
    form_html = f"""<form action="/{form.id}" method="post">"""

    if form.questions is not None:
        for question in form.questions.get_questions():
            form_html += render_question_html(question)

    form_html += "</form>"
    return form_html


def render_question_html(question: Question) -> str:
    """
    Render a question as HTML.
    """
    question_html = "<fieldset>"
    question_html += f"<legend>{md2html(question.content)}</legend>"

    # TODO: Handle localStorage for default values.
    if isinstance(question, SingleTextSelectQuestion):
        question_html += (
            f"""<select name="{question.name}" required="{question.required}">"""
        )
        for i, choice in enumerate(question.choices):
            question_html += f"""<option value="{i}">{md2html(choice)}</option>"""
        question_html += "</select>"
    elif isinstance(question, NumberQuestion):
        question_html += f"""<input type="number" name="{question.name}" required="{question.required}">"""
    elif isinstance(question, TextQuestion):
        question_html += f"""<input type="text" name="{question.name}" required="{question.required}">"""
    elif isinstance(question, TextareaQuestion):
        question_html += (
            f"""<textarea name="{question.name}" required="{question.required}">"""
        )
        if question.default:
            question_html += question.default
        question_html += """</textarea>"""
    elif isinstance(question, CheckboxQuestion):
        question_html += f"""<input type="checkbox" name="{question.name}" required="{question.required}">"""
    elif isinstance(question, ColorQuestion):
        question_html += f"""<input type="color" name="{question.name}" required="{question.required}">"""

    question_html += "</fieldset>"
    return question_html
