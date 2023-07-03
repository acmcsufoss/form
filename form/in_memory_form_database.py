from form.form import Form
from form_database import FormDatabase


class InMemoryFormDatabase(FormDatabase):
    """
    Concrete implementation of FormDatabase using in-memory storage.
    """

    def __init__(self):
        self.forms = dict[str, Form]()
        self.next_form_id = 1

    def save_form(self, form: Form) -> None:
        form_id = self.next_form_id
        self.forms[str(form_id)] = form
        self.next_form_id += 1

    def get_form(self, form_id: str) -> Form | None:
        return self.forms.get(form_id)

    def delete_form(self, form_id: str) -> None:
        if form_id in self.forms:
            del self.forms[form_id]
