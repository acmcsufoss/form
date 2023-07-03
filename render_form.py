from mistune import html as md2html
from form import (
    Form,
    QuestionType,
    Question,
    SingleTextSelectQuestion,
    NumberQuestion,
    TextQuestion,
    TextareaQuestion,
    CheckboxQuestion,
    ColorQuestion,
    QuestionList,
)


def render_form(form: Form, action: str) -> str:
    """
    Render a form as HTML.
    """
    form_html = f"""<form action="{action}" method="post">"""

    for question in form.fields.get_questions():
        form_html += render_question(question)

    form_html += "</form>"
    return form_html


def render_question(question: Question) -> str:
    """
    Render a question as HTML.
    """
    question_html = "<fieldset>"
    question_html += f"<legend>{md2html(question.title)}</legend>"
    # TODO: Handle default values.
    match question.type:
        case QuestionType.SINGLE_TEXT_SELECT:
            question_html += (
                f"""<select name="{question.name}" required="{question.required}">"""
            )
            for choice in question.choices:
                question_html += (
                    f"""<option value="{choice}">{md2html(choice)}</option>"""
                )
            question_html += "</select>"

        case QuestionType.NUMBER:
            question_html += f"""<input type="number" name="{question.name}" required="{question.required}">"""

        case QuestionType.TEXT:
            question_html += f"""<input type="text" name="{question.name}" required="{question.required}">"""

        case QuestionType.TEXTAREA:
            question_html += (
                f"""<textarea name="{question.name}" required="{question.required}">"""
            )
            if question.default:
                question_html += question.default
            question_html += """</textarea>"""

        case QuestionType.CHECKBOX:
            question_html += f"""<input type="checkbox" name="{question.name}" required="{question.required}">"""

        case QuestionType.COLOR:
            question_html += f"""<input type="color" name="{question.name}" required="{question.required}">"""

    return question_html
