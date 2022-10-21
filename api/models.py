from django.db import models

# Create your models here.

class Genre(models.Model):
  name = models.CharField(max_length=100, primary_key=True, blank=False)
  image = models.ImageField(null=True, blank=True)

  class Meta:
    ordering = ['name']

  def __str__(self):
    return self.name

class Emotion(models.Model):
  name = models.CharField(max_length=50, primary_key=True)
  recommend_genres = models.ManyToManyField(Genre, blank=True)  # many to many relationship 
  icon = models.CharField(max_length=50, null=True)  # icon to render the emoji 

  class Meta:
    ordering = ['name']

  def __str__(self):
    return self.name


class User(models.Model):
  user = models.CharField(max_length=255, primary_key=True)
  mood = models.CharField(max_length=50)
  genre = models.CharField(max_length=50)
  artist = models.CharField(max_length=255) # artist id 
  
  def __str__(self):
    return self.user



class Track(models.Model):
  '''
  One User can select two Track objects
  '''
  track = models.CharField(max_length=255)  # track id
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.track
