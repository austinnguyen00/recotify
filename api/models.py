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


  