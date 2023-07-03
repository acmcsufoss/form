from form import Form, FormField, FormFieldType

# TODO: This is slightly wrong because the HTML that should be rendered is the
# HTML for the form edit page and the form response page. This is just a
# placeholder for now.


def render_form(form: Form) -> str:
    """
    Renders the form as HTML.
    """
    form_html = f"<form id='{form.id}'>"
    for field in form.fields:
        form_html += render_form_field(field)

    form_html += "</form>"
    return form_html


def render_form_field(field: FormField) -> str:
    """
    Renders the form field as HTML.
    """
    match field.type:
        case FormFieldType.TEXT:
            return render_text_form_field(field)
        case FormFieldType.TEXTAREA:
            return render_textarea_form_field(field)
        case FormFieldType.NUMBER:
            return render_number_form_field(field)
        case FormFieldType.CHECKBOX:
            return render_checkbox_form_field(field)
        case FormFieldType.DROPDOWN:
            return render_dropdown_form_field(field)
        case FormFieldType.RADIO:
            return render_radio_form_field(field)
        case FormFieldType.DATE:
            return render_date_form_field(field)
        case FormFieldType.TIME:
            return render_time_form_field(field)
        case FormFieldType.DATE_TIME:
            return render_date_time_form_field(field)
        case FormFieldType.TEL:
            return render_tel_form_field(field)
        case FormFieldType.COLOR:
            return render_color_form_field(field)
        case FormFieldType.URL:
            return render_url_form_field(field)
        case FormFieldType.FILE:
            return render_file_form_field(field)
        case _:
            raise ValueError(f"Unknown form field type: {field.type}")
