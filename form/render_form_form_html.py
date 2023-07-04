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

    form_html += "<noscript>"
    form_html += "<p>JavaScript is required to use this form.</p>"
    form_html += "</noscript>"

    form_html += """<label for="shuffled">Shuffled:</label>"""
    form_html += """<input type="checkbox" name="shuffled" />"""

    form_html += "<br />"

    form_html += """<label for="webhook_url">Webhook URL:</label>"""
    form_html += """<input type="url" name="webhook_url" />"""

    form_html += "<br />"

    form_html += """<label for="content">Content:</label>"""
    form_html += """<textarea name="content" placeholder="This is the text that will be sent to the webhook."></textarea>"""

    form_html += "<br />"

    form_html += """<input type="submit" value="Submit" />"""
    form_html += "</form>"
    return form_html
