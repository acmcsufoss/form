from dataclasses import dataclass


@dataclass
class Response:
    """
    A response to a form.
    """

    # id is the unique identifier for the response.
    id: str

    # user_id is the unique identifier for the user that submitted the response.
    user_id: str

    # data is the response data.
    data: dict[str, str]
