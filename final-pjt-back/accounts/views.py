from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.http.response import JsonResponse
from .serializers import UserDetailSerializer
from movies.models import Diary

def get_token(request):
    token = Token.objects.create(user=...)
    return Response({ 'token':token.key, })

    
def rank(request):
    User = get_user_model()
   
    data = {}
    users = User.objects.all()
    for i in users:
        point = 0
        diaries = Diary.objects.filter(user=i)
        for j in diaries:
            point += j.like_users.count()
        data[i.username] = point
    rank = sorted(data.items(), key=lambda x:-x[1])
    print(rank)
    rank_data = {'rank': rank}
    return JsonResponse(rank_data)