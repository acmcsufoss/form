from mistune import html as md2html
import form.form


def render_form_list_html(forms: list[form.form.Form]) -> str:
    """
    Render a list of forms as HTML.
    """
    form_list_html = "<ul>"
    for f in forms:
        form_list_html += f"""<li><a href="/forms/{f.id}">"""
        if (
            f.linked_discord_message is None
            or len(f.linked_discord_message.content) == 0
        ):
            form_list_html += f"""{f.id} (content unset)"""
        else:
            truncated_content = f.linked_discord_message.content[:50]
            form_list_html += f"""{truncated_content}&hellip;"""
            form_list_html += (
                " (sent)" if f.linked_discord_message.id else " (not sent)"
            )
        form_list_html += "</a></li>"
    form_list_html += "</ul>"
    return form_list_html


def render_form_html(f: form.form.Form) -> str:
    """
    Render a form as HTML.
    """
    form_html = f"""<form action="/{f.id}" method="post">"""

    if f.questions is not None:
        for question in f.questions.get_questions():
            form_html += render_question_html(question)

    form_html += "</form>"
    return form_html


def render_question_html(question: form.form.Question) -> str:
    """
    Render a question as HTML.
    """
    question_html = "<fieldset>"
    question_html += f"<legend>{md2html(question.content)}</legend>"

    # TODO: Handle localStorage for default values.
    if isinstance(question, form.form.SingleTextSelectQuestion):
        question_html += (
            f"""<select name="{question.name}" required="{question.required}">"""
        )
        for i, choice in enumerate(question.choices):
            question_html += f"""<option value="{i}">{md2html(choice)}</option>"""
        question_html += "</select>"
    elif isinstance(question, form.form.NumberQuestion):
        question_html += f"""<input type="number" name="{question.name}" required="{question.required}">"""
    elif isinstance(question, form.form.TextQuestion):
        question_html += f"""<input type="text" name="{question.name}" required="{question.required}">"""
    elif isinstance(question, form.form.TextareaQuestion):
        question_html += (
            f"""<textarea name="{question.name}" required="{question.required}">"""
        )
        if question.default:
            question_html += question.default
        question_html += """</textarea>"""
    elif isinstance(question, form.form.CheckboxQuestion):
        question_html += f"""<input type="checkbox" name="{question.name}" required="{question.required}">"""
    elif isinstance(question, form.form.ColorQuestion):
        question_html += f"""<input type="color" name="{question.name}" required="{question.required}">"""

    question_html += "</fieldset>"
    return question_html


def render_layout_css() -> str:
    """
    Render required CSS style tag for all pages.
    """
    # Read CSS content from file.
    with open("form/form_form.css", "r") as file:
        css = "<style>"
        css += file.read()
        css += "</style>"
        return css


def render_form_form_js() -> str:
    """
    Render required JS script tag for form form.
    """
    # Read JS content from file.
    with open("form/form_form.js", "r") as file:
        js = "<script>"
        js += file.read()
        js += "</script>"
        return js


def render_form_form_html(form_id: str) -> str:
    """
    Render a form form as HTML.
    """
    form_html = f"""<form action="/forms/{form_id}" method="post" class="form-form">"""

    form_html += """<div class="questions"></div>"""

    form_html += """<div class="add-question"></div>"""

    form_html += "<noscript>"
    form_html += "<p>JavaScript is required to use this form.</p>"
    form_html += "</noscript>"

    form_html += "<hr />"

    form_html += """<label for="question_shuffled">Shuffled:</label>"""
    form_html += (
        """<input type="checkbox" name="question_shuffled" id="question_shuffled" />"""
    )

    form_html += "<br />"

    form_html += """<label for="question_webhook_url">Webhook URL:</label>"""
    form_html += (
        """<input type="url" name="question_webhook_url" id="question_webhook_url" />"""
    )

    form_html += "<br />"

    form_html += """<label for="question_content">Content:</label>"""
    form_html += """<textarea name="question_content" placeholder="This is the Discord message content."></textarea>"""

    form_html += "<br />"

    form_html += """<label for="question_timestamp">Submit at:</label>"""
    form_html += """<input type="datetime-local" name="question_timestamp" id="question_timestamp" />"""

    form_html += "<br />"

    form_html += """<input type="submit" value="Submit" />"""
    form_html += "</form>"
    return form_html


def render_page_layout_html(content: str) -> str:
    """
    Render the page layout as HTML.
    """
    page_html = "<!DOCTYPE html>"
    page_html += "<html>"
    page_html += "<head>"
    page_html += '<meta charset="UTF-8" />'
    page_html += '<link rel="icon" href="https://acmcsuf.com/favicon.ico" />'
    page_html += "<title>Forms</title>"
    page_html += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">'
    page_html += render_layout_css()
    page_html += "</head>"
    page_html += "<body>"
    page_html += content
    page_html += "</body>"
    page_html += "</html>"
    return page_html


def render_form_list_page_html(forms: list[form.form.Form]) -> str:
    """
    Render the form list page as HTML.
    """
    body_html = "<h1>Forms</h1>"
    body_html += render_form_list_html(forms)
    body_html += '<a href="/forms/new">New form</a>'
    return render_page_layout_html(body_html)


def render_edit_form_page_html(form_id: str) -> str:
    """
    Render the form list page as HTML.
    """
    body_html = "<h1>Edit Form</h1>"
    body_html += render_form_form_html(form_id)
    body_html += '<a href="/forms">Back</a>'
    body_html += '<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>'
    body_html += render_form_form_js()
    return render_page_layout_html(body_html)
