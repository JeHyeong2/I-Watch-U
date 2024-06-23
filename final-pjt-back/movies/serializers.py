from rest_framework import serializers
from .models import Movie, Comment, Diary


class MovieSerializer(serializers.ModelSerializer):
    class CommentSerializer(serializers.ModelSerializer):
        like_user_count = serializers.IntegerField(source='like_users.count')
        dislike_user_count = serializers.IntegerField(source='dislike_users.count')
        username = serializers.CharField(source='user.username', read_only=True)
        movie_title = serializers.CharField(source='movie.title', read_only=True)
        class Meta:
            model = Comment
            fields = '__all__'
            read_only_fields = ('user', 'movie', 'like_users', 'dislike_users')

    user_watch_count = serializers.IntegerField(source='watched_user.count', read_only=True)
    like_users_count = serializers.IntegerField(source='like_users.count', read_only=True)
    comment = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'



class CommentSerializer(serializers.ModelSerializer):
    like_user_count = serializers.IntegerField(source='like_users.count', read_only=True)
    dislike_user_count = serializers.IntegerField(source='dislike_users.count', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    movie_title = serializers.CharField(source='movie.title', read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'movie', 'like_users', 'dislike_users')



class DiarySerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)
    diary_like_count = serializers.IntegerField(source='like_users.count', read_only=True)
    class Meta:
        model = Diary
        fields = '__all__'
        read_only_fields = ('like_users', 'movie', 'user')


