# Generated by Django 4.1.1 on 2022-10-13 15:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("spotify", "0002_spotifytoken_updated_at"),
    ]

    operations = [
        migrations.RemoveField(model_name="spotifytoken", name="access_token",),
        migrations.RemoveField(model_name="spotifytoken", name="refresh_token",),
    ]
