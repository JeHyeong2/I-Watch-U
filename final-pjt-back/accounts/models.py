from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from movies.models import Genre


class User(AbstractUser):
    followers = models.ManyToManyField('self', symmetrical=False, related_name='followings')
    profile_image = models.ImageField(blank=True)
    genres = models.ManyToManyField(Genre, through='point')
    
    def __str__(self) :
        return self.username

class Point(models.Model):
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    point = models.IntegerField(default=0)
