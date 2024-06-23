from django.urls import path
from . import views


urlpatterns = [
    path('accounts/user/', views.rank),

]