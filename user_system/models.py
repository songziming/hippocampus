# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User as Django_user

# Create your models here.

class User(models.Model):
    django_user = models.OneToOneField(Django_user, primary_key=True)
    nickname = models.CharField(max_length=80)
    signature = models.CharField(max_length=200)
    def __unicode__(self):  # 相当于toString
        return django_user.username
