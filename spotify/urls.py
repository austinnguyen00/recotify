from django.urls import path, re_path
from . import views

urlpatterns = [
  path('', views.get_routes),
  path('client-credentials', views.client_credentials, name='client_credentials'),
  path('get-auth-url', views.AuthURL.as_view(), name='get-auth-url'),
  path('callback', views.spotify_callback, name='callback'),
  path('is-refresh-token-valid', views.is_refresh_token_valid, name='is-refresh-token-valid'),
  path('is-access-token-valid', views.is_access_token_valid, name='is-access-token-valid'),
  path('refresh-access-token', views.refresh_access_token, name='refresh-access-token'),
  path('current-song', views.get_current_song, name='current-song'),
  path('genres', views.get_genres, name='genres'),
  path('pause', views.pause_song, name='pause'), 
  path('play', views.play_song, name='play'),
  path('new-release', views.get_new_releases, name='new-release'),
  # path('artists-by-genre', views.get_artists_by_genre, name='artists-by-genre'), 
  path('artists-by-genre/<str:market>/<str:genre>', views.get_artists_by_genre, name='artists-by-genre'), 
  path('top-tracks/<str:market>/<str:artist_id>', views.get_top_tracks_by_artist, name='top-tracks'), 
  path('track/<str:market>/<str:track_id>', views.get_track, name='track'),
  path('track-recommendations/<str:market>/<str:artists_id>/<str:tracks_id>/<str:genres>', views.get_track_recommendations, name='track-recommendations'),
  # re_path(r'^track-recommendation/(?P<artists_id>[\w-]+)/$', views.get_track_recommendations, name='track-recommendations'),
]