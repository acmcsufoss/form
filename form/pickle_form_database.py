import pickle
from form import Form
from form_database import FormDatabase
from typing import Dict, Type


class PickleFormDatabase(FormDatabase):
    """Abstract class for keeping track of all forms."""

    def __init__(self, file_path: str):
        self.file_path = file_path

    def save_form(self, form: Form):
        """Save a form."""
        forms = self._load_forms()
        forms[form.id] = form
        self._save_forms(forms)

    def get_form(self, form_id: str):
        """Retrieve a form by ID."""
        forms = self._load_forms()
        return forms.get(form_id)

    def delete_form(self, form_id: str):
        """Delete a form by ID."""
        forms = self._load_forms()
        if form_id in forms:
            del forms[form_id]
            self._save_forms(forms)

    def _load_forms(self):
        try:
            with open(self.file_path, "rb") as file:
                return pickle.load(file)
        except FileNotFoundError:
            return {}

    def _save_forms(self, forms: Dict[str, Type(Form)]):
        with open(self.file_path, "wb") as file:
            pickle.dump(forms, file)
