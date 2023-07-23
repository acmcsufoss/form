import requests
import datetime


def execute_webhook(webhook_url: str, content: str) -> tuple[str, datetime.datetime]:
    """
    Execute a webhook. Return message ID and timestamp.
    """
    response = requests.post(webhook_url, json={"content": content})
    response.raise_for_status()
    response_json = response.json()
    print(response_json)
    return (
        response_json["id"],
        datetime.datetime.fromisoformat(response_json["timestamp"]),
    )
