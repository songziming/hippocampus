from django.conf.urls import patterns, url
from user_system import views

urlpatterns = patterns('',
    url(r'^default/', views.default, name='default'),
    url(r'^register/', views.register, name='register'),
    url(r'^do_register/', views.do_register, name='do_register'),
    url(r'^login/', views.login, name='login'),
    url(r'^do_login/', views.do_login, name='do_login'),
    url(r'^do_logout/', views.do_logout, name='do_logout'),
)
