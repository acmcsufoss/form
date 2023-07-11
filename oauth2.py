import requests
import os

API_ENDPOINT = "https://discord.com/api/v10"
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")


def exchange_code(code, redirect_uri):
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    r = requests.post("%s/oauth2/token" % API_ENDPOINT, data=data, headers=headers)
    r.raise_for_status()
    return r.json()
