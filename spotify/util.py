from . import models
from django.utils import timezone
from datetime import timedelta
from .credentials import *
import requests, base64

BASE_URL = 'https://api.spotify.com/v1'

def get_user_token(session_id):
  '''
  Get the user token from the session_id
  '''
  user_token = models.SpotifyToken.objects.filter(user=session_id)
  if user_token:
    return user_token[0]
  else:
    return None

def update_or_create_user_token(session_id, access_token, token_type, expires_in, refresh_token):
  '''
  Update spotify token or create new one associated with given session_id of the user in the database
  '''
  token = get_user_token(session_id)
  expires_in = timezone.now() + timedelta(seconds=expires_in)   # time the token will expire

  if token:
    token.access_token = access_token
    token.refresh_token = refresh_token
    token.token_type = token_type
    token.expires_in = expires_in
    token.save(update_fields=['access_token', 'refresh_token', 'token_type', 'expires_in'])  # save the token object back to the database
  else:  # create new token
    token = models.SpotifyToken(user=session_id, access_token=access_token, refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
    token.save()


def is_access_token_valid(session_id):
  '''
  Check if the user access token is still valid
  '''
  token = get_user_token(session_id)
  if not token:
    return False
    
  expiry = token.expires_in
  if expiry > timezone.now():  # token have not expired
    return True
  else:
    return False


def refresh_spotify_token(session_id):
  '''
  Send the refresh token to the /api/token endpoint to get a new access token
  '''
  refresh_token = get_user_token(session_id).refresh_token

  data = {
    'grant_type': 'refresh_token',
    'refresh_token': refresh_token,
  }
  headers = get_token_headers()
  response = requests.post(url='https://accounts.spotify.com/api/token', data=data, headers=headers).json()  # request a refreshed access token using refresh token

  access_token = response['access_token']
  token_type = response['token_type']
  expires_in = response['expires_in']

  update_or_create_user_token(session_id, access_token, token_type, expires_in, refresh_token)


def get_client_credentials():
    '''
    Returns a base64 encoded string of client
    '''
    client_creds = f"{CLIENT_ID}:{CLIENT_SECRET}"
    client_creds_b64 = base64.b64encode(client_creds.encode())
    return client_creds_b64.decode()


def get_token_headers():
  '''
  Returns access token request header
  '''
  client_creds_b64 = get_client_credentials()
  return {
      'Authorization': f'Basic {client_creds_b64}', # 'Basic <base64 encoded client_id:client_secret>'
      'Content-Type': 'application/x-www-form-urlencoded'
  }

def client_credentials():

  # print("Access Token: %s" % token.access_token)
  headers = get_token_headers()
  params = {
    'grant_type': 'client_credentials',
  }
  response = requests.post(url='https://accounts.spotify.com/api/token', headers=headers, params=params)
  print("Response:", response.json())
  return response.json()


def execute_spotify_api_request(session_id, endpoint, params='', post=False, put=False):
  '''
  Execute request to spotify API endpoint to get album, artist, etc. information
  '''
  token = get_user_token(session_id)
  # print("Access Token: %s" % token.access_token)
  headers = {
    "Accept": "application/json",
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + token.access_token
  }
  print("Access token: %s" % token.access_token)

  if post:
    requests.post(url=BASE_URL + endpoint, headers=headers, params=params)
  if put:
    requests.put(url=BASE_URL + endpoint, headers=headers, params=params)

  # GET request
  response = requests.get(url=BASE_URL + endpoint, headers=headers, params=params)
  print("Response Status:", response.headers)
  
  try:
    return response.json()
  except:
    return({'Error': 'Issue with request'})
    # return response.json()

def play_song(session_id):
  '''
  Continue to play song from resume state
  '''
  return execute_spotify_api_request(session_id, endpoint="/me/player/play", put=True)
