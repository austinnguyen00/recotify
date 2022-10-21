from django.urls import path
from. import views

urlpatterns = [
    path(route='emotions', view=views.get_emotions, name='emotions'),
    path(route='emotions/<str:pk>', view=views.get_emotion, name='emotion'),
    path(route='user/<str:user>', view=views.get_user, name='user'),
]