from django.contrib import admin
from django.urls import path
from apps.authentication import views



app_name = 'authentication'
urlpatterns = [
    path('loginUser/',views.loginUser, name='loginUser'),
    path('reg/',views.reg, name='reg'),
    path('logoutUser/',views.logoutUser, name='logoutUser'),
    path('loginToken/',views.loginToken, name='loginToken'),
    path('changeUser/',views.changeUser, name='changeUser'),
    path('googleLogin/',views.googleLogin, name='googleLogin'),
    ]