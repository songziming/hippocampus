# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    nickname = models.CharField(max_length=80, default="")
    signature = models.CharField(max_length=200, default="")
    notesOrder = models.CharField(max_length=640, default="")
    gender = models.CharField(max_length=16, default="Male")
    def __unicode__(self):  # 相当于toString
        return "%s's profile" % self.user

