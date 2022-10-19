from django.db import models

class SpotifyToken(models.Model):
  '''
  Store user spotify token for future use in the application
  '''
  user = models.CharField(max_length=50, unique=True)   # session_id of the user
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  access_token = models.CharField(max_length=255, null=True)
  refresh_token = models.CharField(max_length=255, null=True)
  expires_in = models.DateTimeField()
  token_type = models.CharField(max_length=50)

  def __str__(self):
    return self.user