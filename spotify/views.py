from django.shortcuts import render, redirect
from .credentials import *
from .models import *
from .serializers import *

from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . import util
import requests
import json


@api_view(['GET', 'POST'])
def get_routes(request):
  # routes = [
  #   'GET /api',
  # ]
  # return Response(routes)

  scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

  params = {
      'client_id': CLIENT_ID,
      'response_type': 'code',
      'redirect_uri': REDIRECT_URI,
      'scope': scopes,
  }
  r = requests.get(url='https://accounts.spotify.com/authorize', params=params)
  return render(request=request, template_name='spotify/get_routes.html', context={'url' :r.url})


@api_view(['GET'])
def client_credentials(request):
  # print("Access Token: %s" % token.access_token)
  headers = util.get_token_headers()
  params = {
    'grant_type': 'client_credentials',
  }
  response = requests.post(url='https://accounts.spotify.com/api/token', headers=headers, params=params).json()
  print("Response:", response)

  try:
    access_token = response['access_token']
    token_type = response['token_type']
    expires_in = response['expires_in']
    song = {'title': 'test'}
    return Response(response, status=status.HTTP_200_OK)
  except:
    return Response({'Fail to authorize access'}, status=status.HTTP_400_BAD_REQUEST)


class AuthURL(APIView):
  '''
  APIView class return request authorization url
  '''
  def get(self, request, format=None):
    # scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
    scopes = ''

    url = requests.Request('GET', 'https://accounts.spotify.com/authorize', params={
      'scope': scopes,
      'response_type': 'code',
      'redirect_uri': REDIRECT_URI,
      'client_id': CLIENT_ID
    }).prepare().url
    print("Url:", url)

    try:
      return Response({'url': url}, status=status.HTTP_200_OK)
    except:
      return Response({"Message": "Cannot authorized"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
def spotify_callback(request, format=None):
  '''
  Request access and refresh tokens
  '''

  # Get the code query parameter from the callback - error parameter in case of error
  code = request.GET.get('code')
  error = request.GET.get('error')

  data = {
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'grant_type': 'authorization_code', 
    'code': code, 
    'redirect_uri': REDIRECT_URI, 
    'error': error}
  response = requests.post('https://accounts.spotify.com/api/token', data=data).json()  # convert response to json

  try:
    # Get Json data from the response
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')   # time duration in seconds == 3600
    error = response.get('error')
    
    # Create session key for new user
    if not request.session.exists(request.session.session_key):
      request.session.create()

    session_id = request.session.session_key
    util.update_or_create_user_token(session_id, access_token, token_type, expires_in, refresh_token)
    response = redirect(f'/#/country')
    return response
    
  except:
    return Response({'Fail to authorize access from user'}, status=status.HTTP_400_BAD_REQUEST)
  
  # response = redirect(f'{FRONTEND_BASE_URL}/get-started')



@api_view(['GET'])
def is_refresh_token_valid(request):
  '''
  Check if user refresh token is valid - the user has to authorized access to their account already
  '''
  session_id = request.session.session_key
  token = util.get_user_token(session_id)

  try:
    if token.refresh_token:
      return Response({'status': True}, status=status.HTTP_200_OK)
  except:
    return Response({'status': False}, status=status.HTTP_200_OK)
  

@api_view(['GET'])
def is_access_token_valid(request):
  '''
  Check if user has valid access token
  '''
  session_id = request.session.session_key
  is_access_token_valid = util.is_access_token_valid(session_id)
  return Response({'status': is_access_token_valid}, status=status.HTTP_200_OK)


@api_view(['GET'])
def refresh_access_token(request):
  session_id = request.session.session_key
  try:
    util.update_or_create_user_token(session_id=session_id)
    return Response({'status': True}, status=status.HTTP_200_OK)
  except:
    return Response({'status': False}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_current_song(request):
  '''
  Get currently playing song of the Spotify user
  '''
  session_id = request.session.session_key
  print("Session ID:", session_id)
  endpoint = '/me/player/currently-playing'
  response = util.execute_spotify_api_request(session_id, endpoint=endpoint)
  print('Response:', response)

  # No song is currently playing or error while getting the song
  if 'error' in response or 'item' not in response:
    return Response({}, status=status.HTTP_204_NO_CONTENT)

  item = response['item']
  progress = response['progress_ms']  # current playtime of the song
  duration = item['duration_ms']
  album_cover = item['album'].get('images')[0].get('url')
  song_id = item['id']
  artist_id = item['artists'][0].get('id')
  popularity = item['popularity']
  is_playing = response['is_playing'] 

  artist_string = ""  # string of all artist(s) of the song

  # Get all artist information
  for i, artist in enumerate(item['artists']):
    if i > 0:
      artist_string += ", "
    name = artist['name']
    artist_string += name
  
  song = {
    'title': item['name'],
    'artist': artist_string,
    'duration': duration,
    'time': progress,
    'image': album_cover,
    'is_playing': is_playing,
    'song_id': song_id,
    'artist_id': artist_id,
  }

  return Response(data=song, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_genres(request):
  session_id = request.session.session_key
  print("Session ID:", session_id)
  endpoint = '/recommendations/available-genre-seeds'
  response = util.execute_spotify_api_request(session_id, endpoint=endpoint)
  print('Response:', response)

  return Response(response)


@api_view(['GET'])
def pause_song(request):
  '''
  Pause playback
  '''
  try:
    session_id = request.session.session_key
    execute_spotify_api_request(session_id, endpoint="/me/player/pause", put=True)
    return Response({"Message: Playsong"}, status=status.HTTP_200_OK)
  except:
    return Response({"Message: Cannot pause song"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def play_song(session_id):
  '''
  Start a new context or resume current playback
  '''
  try:
    session_id = request.session.session_key
    execute_spotify_api_request(session_id, endpoint="/me/player/play", put=True)
    return Response({"Message: Playsong"}, status=status.HTTP_200_OK)
  except:
    return Response({"Message: Cannot play song"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_new_releases(request):
  '''
  Get new releases album
  '''
  session_id = request.session.session_key
  endpoint = '/browse/new-releases'
  params = {
    'country': 'VN',
    'limit': 3,
  }
  response = util.execute_spotify_api_request(session_id, endpoint=endpoint, params=params)
  return Response(response)


@api_view(['GET'])
def get_artists_by_genre(request, genre, market):
  '''
  Query artists by one genre
  '''
  session_id = request.session.session_key
  endpoint = '/search'
  params = {
    'q': f'genre:{genre}',
    'type': 'artist',
    'market': market,
    'limit': 10,
  }
  response = util.execute_spotify_api_request(session_id, endpoint=endpoint, params=params)

  # Create new dictionary of artists to be returned
  try:
    items = response['artists']['items']
    artists = {}
    for i, item in enumerate(items):
      key = f'artist_{i+1}'
      artists[key] = {}
      artists[key]['name'] = item['name']
      artists[key]['id'] = item['id']
      artists[key]['genres'] = item['genres']
      artists[key]['image'] = item['images'][0].get('url')
      artists[key]['followers'] = item['followers']['total']

    return Response(artists)
  except:
    return Response(response, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_top_tracks_by_artist(request, artist_id, market):
  '''Get most poplular tracks by artist'''
  session_id = request.session.session_key
  endpoint = f'/artists/{artist_id}/top-tracks'
  params = {
    'market': market,
  }
  response = util.execute_spotify_api_request(session_id, endpoint=endpoint, params=params)

  top_tracks = {}

  try:
    tracks = response['tracks']  # five tracks total
    for i, track in enumerate(tracks):
      key = f'track_{i+1}'
      top_tracks[key] = {}
      top_tracks[key]['name'] = track['name']
      top_tracks[key]['track_id'] = track['id']

      artists = []  
      # Get all artists of the track
      for artist in track['artists']:
        artists.append({
          'name': artist['name'],
          'artist_id': artist['id'],
        })

      top_tracks[key]['artists'] = artists
      top_tracks[key]['image'] = track['album']['images'][0].get('url')
      top_tracks[key]['preview_url'] = track['preview_url']
      top_tracks[key]['track_url'] = track['external_urls']['spotify']
      top_tracks[key]['popularity'] = track['popularity']
      
    return Response(top_tracks)
  except:
    return Response(response, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_track(request, track_id, market):
  '''
  Get track from track_id
  '''
  session_id = request.session.session_key
  endpoint = f'/tracks/{track_id}'
  params = {
    'market': market,
  }
  response = util.execute_spotify_api_request(session_id, endpoint=endpoint, params=params)
  print('Response:', response)

  # No song is currently playing or error while getting the song
  if 'error' in response or 'item' not in response:
    return Response({}, status=status.HTTP_204_NO_CONTENT)

  item = response['item']
  progress = response['progress_ms']  # current playtime of the song
  duration = item['duration_ms']
  album_cover = item['album'].get('images')[0].get('url')
  song_id = item['id']
  artist_id = item['artists'][0].get('id')
  popularity = item['popularity']
  is_playing = response['is_playing'] 

  artist_string = ""  # string of all artist(s) of the song

  # Get all artist information
  for i, artist in enumerate(item['artists']):
    if i > 0:
      artist_string += ", "
    name = artist['name']
    artist_string += name
  
  song = {
    'title': item['name'],
    'artist': artist_string,
    'duration': duration,
    'time': progress,
    'image': album_cover,
    'is_playing': is_playing,
    'song_id': song_id,
    'artist_id': artist_id,
  }

  return Response(response)


@api_view(['GET'])
def get_track_recommendations(request, market, artists_id, tracks_id, genres):
  session_id = request.session.session_key
  endpoint = f'/recommendations'
  params = {
    'limit': 8,
    'market': market,
    'seed_artists': artists_id,  # artists id separated by comma
    'seed_tracks': tracks_id,  # list of tracks id
    'seed_genres': genres, # list of genres
  }
  # Example URL
  ## track-recommendatations/VN/57g2v7gJZepcwsuwssIfZs/6VXVYATpQXEIoZ97NnWCmn,6VXVYATpQXEIoZ97NnWCmn/indie
  response = util.execute_spotify_api_request(session_id, endpoint=endpoint, params=params)

  recommend_tracks = {}
  tracks = response['tracks']  # five tracks total
  for i, track in enumerate(tracks):
    key = f'track_{i+1}'
    recommend_tracks[key] = {}
    recommend_tracks[key]['name'] = track['name']
    recommend_tracks[key]['track_id'] = track['id']

    artists = []  
    # Get all artists of the track
    for artist in track['artists']:
      artists.append({
        'name': artist['name'],
        'artist_id': artist['id'],
      })

    recommend_tracks[key]['artists'] = artists
    recommend_tracks[key]['image'] = track['album']['images'][0].get('url')
    recommend_tracks[key]['preview_url'] = track['preview_url']
    recommend_tracks[key]['track_url'] = track['external_urls']['spotify']
    recommend_tracks[key]['popularity'] = track['popularity']
  
  return Response(recommend_tracks)