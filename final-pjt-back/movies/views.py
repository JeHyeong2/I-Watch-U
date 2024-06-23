from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import MovieSerializer, CommentSerializer, DiarySerializer
from .models import Movie, Comment, Diary
from django.contrib.auth import get_user_model
from accounts.models import Point


@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, id=movie_pk)
    if movie.like_users.filter(id=request.user.pk).exists():
        movie.is_movie_like = True
    else:
        movie.is_movie_like = False

    if movie.watched_user.filter(id=request.user.pk).exists():
        movie.is_movie_watch = True
    else:
        movie.is_movie_watch = False

    movie.save()
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def movie_like(request, movie_pk):
    movie = get_object_or_404(Movie, id=movie_pk)
    user = request.user
    user_point = user.point_set.all()
    if movie.like_users.filter(id=request.user.pk).exists():
            movie.like_users.remove(request.user)
            movie.is_movie_like = False
            movie.save()
            point = len(movie.genres.all())
            for i in movie.genres.all():
                model = user.point_set.get(genre_id=i.id)
                model.point -= point
                point -= 1
                model.save()
    else:
        movie.like_users.add(request.user)
        movie.is_movie_like = True
        movie.save()
        point = len(movie.genres.all())
        for i in movie.genres.all():
            if user.point_set.filter(genre_id=i.id).exists():
                model = user.point_set.get(genre_id=i.id)
                model.point += point
                point -= 1
                model.save()
            else:
                Point.objects.create(point=point, genre_id=i.id, user=user)
                point -= 1
    serializer = MovieSerializer(movie)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def user_watched(request, movie_pk):
    movie = get_object_or_404(Movie, id=movie_pk)
    user = request.user
    if movie.watched_user.filter(id=request.user.pk).exists():
        movie.watched_user.remove(request.user)
        diary = user.diary_user.filter(movie_id=movie_pk)
        diary.delete()
        movie.is_movie_watch = False
        movie.save()
        for i in movie.genres.all():
            model = user.point_set.get(genre_id=i.id)
            model.point -= 1
            model.save()
    else:
        movie.watched_user.add(request.user)
        Diary.objects.create(user=request.user, movie_id=movie_pk)
        movie.is_movie_watch = True
        movie.save()
        for i in movie.genres.all():
            if user.point_set.filter(genre_id=i.id).exists():
                model = user.point_set.get(genre_id=i.id)
                model.point += 1
                model.save()
            else:
                Point.objects.create(point=1, genre_id=i.id, user=user)

    serializer = MovieSerializer(movie)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def comment_create(request, movie_pk):
    movie = get_object_or_404(Movie, id=movie_pk)
    serializer = CommentSerializer(data=request.data)
    data = MovieSerializer(movie)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user, movie=movie)
        return Response(data.data, status=status.HTTP_201_CREATED)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def comment_like(request, movie_pk, comment_pk):
    movie = get_object_or_404(Movie, id=movie_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)
    if comment.user == request.user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    if comment.like_users.filter(id=request.user.pk).exists():
        comment.like_users.remove(request.user)
        comment.is_comment_like = False
        comment.save()
    else:
        comment.like_users.add(request.user)
        comment.is_comment_like = True
        comment.save()
    serializer = MovieSerializer(movie)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def comment_dislike(request,movie_pk, comment_pk):
    movie = get_object_or_404(Movie, id=movie_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)
    if comment.user == request.user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    if comment.dislike_users.filter(id=request.user.pk).exists():
        comment.dislike_users.remove(request.user)
        comment.is_comment_dislike = False
        comment.save()
    else:
        comment.dislike_users.add(request.user)
        comment.is_comment_dislike = True
        comment.save()
    serializer = MovieSerializer(movie)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def diary_list(request, username):
    Users = get_user_model()
    user = Users.objects.get(username=username)
    diaries = Diary.objects.filter(user=user)
    for diary in diaries:
        if diary.like_users.filter(id=request.user.pk).exists():
            diary.is_diary_like = False
            diary.save()
        else:
            diary.is_diary_like = True
            diary.save()
    serializer = DiarySerializer(diaries, many=True)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def diary_create(request, username, diary_pk):
    Users = get_user_model()
    user = Users.objects.get(username=username)
    diaries = Diary.objects.filter(user=user)
    diary = get_object_or_404(diaries, id=diary_pk)
    
    serializer = DiarySerializer(diary, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        data = DiarySerializer(diaries, many=True)
        return Response(data.data, status=status.HTTP_201_CREATED)
    
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def diary_like(request,username,diary_pk):
    diary = get_object_or_404(Diary, id=diary_pk)
    Users = get_user_model()
    user = Users.objects.get(username=username)
    diaries = Diary.objects.filter(user=user)
    if user == request.user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    if diary.like_users.filter(id=request.user.pk).exists():
        diary.like_users.remove(request.user)
        diary.is_diary_like = False
        diary.save()
    else:
        diary.like_users.add(request.user)
        diary.is_diary_like = True
        diary.save()
    serializer = DiarySerializer(diaries, many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def recommend_movie(request):
    user = request.user
    recommend = user.point_set.order_by('-point')[:3]
    rlist = []
    for i in recommend:
        rlist.append(i.genre_id)
    data = {'genre' : rlist, 'count': user.movie_like.count() + user.watched.count()}
    return JsonResponse(data)

@api_view(['GET'])
def comments(request):
    comments = get_list_or_404(Comment)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)