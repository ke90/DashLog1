from django.contrib import admin
from django.urls import path
from apps.logger import views, viewStream

app_name = 'logger'
urlpatterns = [
    path('load_logs/',views.load_logs, name='load_logs'),
    path('webhook/', viewStream.webhook_receiver, name='webhook_receiver'),
    path('stream_events/', viewStream.stream_events, name='stream_events'),
    ]