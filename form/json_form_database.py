import json
import form.form
import form.form_database


class JSONFormDatabase(form.form_database.FormDatabase):
    """Abstract class for keeping track of all forms."""

    def __init__(self, file_path: str):
        self.file_path = file_path

    def save_form(self, f: form.form.Form) -> None:
        """Save a form."""
        form_map = self._load_forms()
        form_map.data[f.id] = f
        self._save_forms(form_map)

    def get_form(self, form_id: str) -> form.form.Form | None:
        """Retrieve a form by ID."""
        form_map = self._load_forms()
        return form_map.data.get(form_id)

    def get_all_forms(self) -> list[form.form.Form]:
        """Retrieve all forms."""
        form_map = self._load_forms()
        return list(form_map.data.values())

    def delete_form(self, form_id: str) -> None:
        """Delete a form by ID."""
        form_map = self._load_forms()
        if form_id in form_map.data.keys():
            del form_map.data[form_id]
            self._save_forms(form_map)

    def _load_forms(self) -> form.form.FormMap:
        with open(self.file_path, "r") as f:
            data = json.load(f)
            return form.form.FormMap(**data)

    def _save_forms(self, form_map: form.form.FormMap) -> None:
        with open(self.file_path, "w") as f:
            f.write(form_map.model_dump_json(indent=2))
