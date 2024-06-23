from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Movie(models.Model) :
    title = models.CharField(max_length=100)
    released_date = models.DateField()
    popularity = models.FloatField()
    overview = models.TextField()
    vote_average = models.FloatField()
    poster_path = models.CharField(max_length=500)
    genres = models.ManyToManyField(Genre)
    watched_user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='watched')
    is_movie_watch = models.BooleanField(default=False)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='movie_like')  
    is_movie_like = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comment_user')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='comment')
    content = models.CharField(max_length=200)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='comment_like')
    is_comment_like = models.BooleanField(default=False)
    dislike_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='comment_dislike')
    is_comment_dislike = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Diary(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='diary_user')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='diary_movie')
    content = models.CharField(max_length=200, null=True)
    date = models.DateField(null=True)
    score = models.IntegerField(validators=[MinValueValidator(0),
                                       MaxValueValidator(10)],null=True)
    people = models.CharField(max_length=200, null=True)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='diary_like')
    is_diary_like = models.BooleanField(default=False)
    is_open = models.BooleanField(default=False)