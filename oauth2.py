import requests
import os
from urllib.parse import quote

API_ENDPOINT = 'https://discord.com/api/v10'

def exchange_code(code: str, redirect_uri: str, client_id: str, client_secret: str):
  """
  https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-exchange-example

  """
  data = {
    'client_id': client_id,
    'client_secret': client_secret,
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': redirect_uri
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  r = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers)
  r.raise_for_status()
  return r.json()

def make_authorization_url(client_id: str, redirect_uri: str) -> str:
  return f"https://discord.com/oauth2/authorize?response_type=code&client_id={client_id}&scope=identify%20guilds.join%20guilds.members.read&redirect_uri={quote(redirect_uri)}"

