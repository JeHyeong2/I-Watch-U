from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Point
from movies.models import Diary
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta : 
        model = User
        fields = ('username', 'password','email')


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta : 
        model = User
        fields = ('username','email','id', 'profile_image')

class PointSerializer(serializers.ModelSerializer):

    class Meta:
        model = Point
        fields = ('point', 'genre')
        read_only_fields = ('user',)