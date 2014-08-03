# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    nickname = models.CharField(max_length=80)
    signature = models.CharField(max_length=200)
    def __unicode__(self):  # 相当于toString
        return "%s's profile" % self.user

