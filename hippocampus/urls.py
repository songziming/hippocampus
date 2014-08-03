from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hippocampus.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    # user_system
    url(r'^$', 'user_system.views.default'),
    url(r'^register/$', 'user_system.views.register'),
    url(r'^login/$', 'user_system.views.login'),
    url(r'^default/$', 'user_system.views.default'),
    url(r'^settings/$', 'user_system.views.settings'),

    url(r'^do_register/$', 'user_system.views.do_register'),
    url(r'^do_login/$', 'user_system.views.do_login'),
    url(r'^do_logout/$', 'user_system.views.do_logout'),
    url(r'^do_update_settings/$', 'user_system.views.do_update_settings'),
    url(r'^do_update_preferences/$', 'user_system.views.do_update_preferences'),
)
