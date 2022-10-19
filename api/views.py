from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *


@api_view(['GET'])
def get_emotions(request):
  '''Get all the emotions object'''

  emotions = Emotion.objects.all()  # query all emotion objects - python format
  serializer = EmotionSerializer(emotions, many=True)  # serializer object
  return Response(serializer.data)

@api_view(['GET'])
def get_emotion(request, pk):
  '''Get a single emotion object'''

  emotions = Emotion.objects.get(name=pk.capitalize())  # query all emotion objects - python format
  serializer = EmotionSerializer(emotions, many=False)  # serializer object
  return Response(serializer.data)


@api_view(['GET'])
def get_genres(request):
  genres = Genre.objects.all()  # query all emotion objects - python format
  serializer = EmotionSerializer(emotions, many=True)  # serializer object
  print("Serializer: {}".format(serializer))
  return Response(serializer.data)