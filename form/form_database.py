from form.form import Form


class FormDatabase:
    """Abstract class for keeping track of all forms."""

    def save_form(self, form: Form) -> None:
        """Abstract method to save a form."""
        raise NotImplementedError("save_form method must be implemented.")

    def get_form(self, form_id: str) -> Form | None:
        """Abstract method to retrieve a form by ID."""
        raise NotImplementedError("get_form method must be implemented.")

    def delete_form(self, form_id: str) -> None:
        """Abstract method to delete a form by ID."""
        raise NotImplementedError("delete_form method must be implemented.")
