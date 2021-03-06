from django.conf.urls import include, url
import django.contrib.auth.views

urlpatterns = [
    url(r'^$', 'main.views.initial', name='initial'),
    url(r'^login/$', 'main.views.login', name='login'),
    url(r'^logout/$', 'main.views.logout', name='logout'),
    url(r'^password/reset/$',
        django.contrib.auth.views.password_reset,
        {"template_name": "password_reset/password_reset_form.html"},
        name="password_reset"
        ),
    url(r'^password/reset/done/$',
        django.contrib.auth.views.password_reset_done,
        {"template_name": "password_reset/password_reset_form_done.html"},
        name="password_reset_done"),
    url(r'^password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>.+)/$',
        django.contrib.auth.views.password_reset_confirm,
        {"template_name": "password_reset/password_reset_confirm.html"},
        name="password_reset_confirm"),
    url(r'^password/reset/confirm/done/$',
        django.contrib.auth.views.password_reset_complete,
        {"template_name": "password_reset/password_reset_complete.html"},
        name="password_reset_complete"),
    url(r'^posts/$', 'main.views.all_posts', name='posts'),
    url(r'^post-previews/$', 'main.views.post_previews', name='post-previews'),
    url(r'^bootstrap/$', 'main.views.bootstrap', name='bootstrap'),
    url(r'^page-admin/$', 'main.views.page_admin', name='page_admin'),
    url(r'^posts/(?P<id>[0-9]+)/$', 'main.views.edit_post', name='edit_post'),
    url(r'^posts/(?P<id>[0-9]+)/json/$', 'main.views.post_json', name='post_json'),
]
