from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *


# @api_view(['GET'])


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
  serializer = EmotionSerializer(genres, many=True)  # serializer object
  print("Serializer: {}".format(serializer))
  return Response(serializer.data)


@api_view(['GET'])
def get_user(request, user):
  '''Get a single emotion object'''
  users = User.objects.get(user=user)  # query all emotion objects - python format
  serializer = UserSerializer(users, many=False)  # serializer object
  return Response(serializer.data)


@api_view(['POST'])
def create_user(request):
  # Create session key for new user
  if not request.session.exists(request.session.session_key):
    request.session.create()

  session_id = request.session.session_key
  user = User(user=session_id)
  user.save()

@api_view(['PUT'])
def update_user(request):
  session_id = request.session.session_key
  data = request.databases
  user = User.objects.get(user=session_id)
  serializer = UserSerializer(instance=user, data=data)

  if serialize.is_valid():
    serializer.save()
  
  return serializer.data


# @api_view(['GET', 'POST', 'PUT'])
# def user(request):
#   if req