from django.conf.urls import patterns, url
from user_system import views

urlpatterns = patterns('',
    url(r'^register/', views.register, name='register'),
    url(r'^login/', views.login, name='login'),
)
