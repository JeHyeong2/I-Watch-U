from django.urls import path
from . import views


urlpatterns = [
    path('', views.movie_list),
    path('<int:movie_pk>/', views.movie_detail),
    path('<int:movie_pk>/like/', views.movie_like),
    path('<int:movie_pk>/comment/', views.comment_create),
    path('<int:movie_pk>/user_watched/', views.user_watched),
    path('<int:movie_pk>/comment/<int:comment_pk>/like/', views.comment_like),
    path('<int:movie_pk>/comment/<int:comment_pk>/dislike/', views.comment_dislike),
    path('mymovies/<username>/', views.diary_list),
    path('mymovies/<username>/<int:diary_pk>/create/', views.diary_create),
    path('mymovies/<username>/<int:diary_pk>/like/', views.diary_like),
    path('recommend/', views.recommend_movie),
    path('comments/', views.comments)
]