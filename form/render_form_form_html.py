# def render_form_form_js() -> str:
#     """
#     Render required JS script tag for form form.
#     """
#     js = """<script type="text/javascript">"""
#     js += os.read_file("static/js/form.js")
#     js += """</script>"""
#     return js


def render_form_form_html(form_id: str, discord_channels: list[tuple[str, str]]) -> str:
    """
    Render a form form as HTML.
    """
    form_html = f"""<form action="/forms/{form_id}" method="post" class="form-form">"""

    form_html += """<div class="questions" />"""

    form_html += """<label for="shuffled">Shuffled:</label>"""
    form_html += """<input type="checkbox" name="shuffled" />"""

    form_html += "<noscript>"
    form_html += "<p>JavaScript is required to use this form.</p>"
    form_html += "</noscript>"

    form_html += """<label for="channel_id">Channel ID:</label>"""
    form_html += """<select name="channel_id" required="true">"""
    for channel_id, channel_name in discord_channels:
        form_html += f"""<option value="{channel_id}">{channel_name}</option>"""
    form_html += "</select>"

    form_html += """<input type="submit" value="Submit" />"""
    form_html += "</form>"
    return form_html
