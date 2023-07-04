import pickle
from response.response import Response
from response.response_database import ResponseDatabase


class PickleResponseDatabase(ResponseDatabase):
    """Response database implementation using local pickle storage."""

    def __init__(self, storage_path: str):
        self.storage_path = storage_path
        self.responses = self._load_responses()

    def _load_responses(self) -> dict[str, Response]:
        try:
            with open(self.storage_path, "rb") as file:
                return pickle.load(file)
        except FileNotFoundError:
            return {}

    def _save_responses(self):
        with open(self.storage_path, "wb") as file:
            pickle.dump(self.responses, file)

    def save_response(self, response: Response):
        self.responses[response.id] = response
        self._save_responses()

    def get_response(self, response_id: str) -> Response | None:
        return self.responses.get(response_id)

    def delete_response(self, response_id: str):
        if response_id in self.responses:
            del self.responses[response_id]
            self._save_responses()
        else:
            print(f"Response with ID '{response_id}' not found.")
