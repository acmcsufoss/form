from form import Form
from form_database import FormDatabase


class InMemoryFormDatabase(FormDatabase):
    """Concrete implementation of FormDatabase using in-memory storage."""

    def __init__(self):
        self.forms = {}
        self.next_form_id = 1

    def save_form(self, form: Form):
        form_id = self.next_form_id
        self.forms[form_id] = form
        self.next_form_id += 1

    def get_form(self, form_id: str):
        return self.forms.get(form_id)

    def delete_form(self, form_id: str):
        if form_id in self.forms:
            del self.forms[form_id]
