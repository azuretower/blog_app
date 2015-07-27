from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core import serializers
from main.models import Post
import time


def initial(request):
    return render(request, 'index.html', {})


def all_posts(request):

    posts = Post.objects.all().order_by('-date_posted')

    json = serializers.serialize('json', posts)

    return HttpResponse(json, content_type='application/json')

    # return render(request, 'posts.html', {'posts': posts})


def create_post(request):

    title = request.POST['title']
    text = request.POST['text']

    user = User.objects.all().first()

    post = Post.objects.create(
        title=title,
        text=text,
        author=user,
    )

    return render(request, 'posts.html', {'posts': [post, ]})


def edit_post(request, id):

    if request.method == 'DELETE':

        Post.objects.get(id=id).delete()

        return HttpResponse(status=204)


def bootstrap(request):
    return render(request, 'bootstrap.html', {})


def page_admin(request):
    return render(request, 'page_admin.html', {})
