from rest_framework.serializers import ModelSerializer
from .models import *

class SpotifyTokenSerializer(ModelSerializer):
  class Meta:
    model = SpotifyToken
    fields = '__all__'

