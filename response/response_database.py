from response.response import Response


class ResponseDatabase:
    """Abstract class for keeping track of all responses."""

    def save_response(self, response: Response) -> None:
        """Abstract method to save a response."""
        raise NotImplementedError("save_response method must be implemented.")

    def get_response(self, response_id: str) -> Response | None:
        """Abstract method to retrieve a response by ID."""
        raise NotImplementedError("get_response method must be implemented.")

    def delete_response(self, response_id: str) -> None:
        """Abstract method to delete a response by ID."""
        raise NotImplementedError("delete_response method must be implemented.")
