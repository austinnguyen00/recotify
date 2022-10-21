from rest_framework.serializers import ModelSerializer
from .models import *

class EmotionSerializer(ModelSerializer):
  class Meta:
    model = Emotion
    fields = '__all__'  # all attributes in the model

class GenreSerializer(ModelSerializer):
  class Meta:
    model = Genre
    fields = '__all__' 

class UserSerializer(ModelSerializer):
  class Meta:
    model = User
    fields = '__all__' 

class TrackSerializer(ModelSerializer):
  class Track:
    model = Track
    fields = '__all__' 