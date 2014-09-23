#! /usr/bin/env python
# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User)
    title = models.CharField(max_length=128, default="no title")
    category = models.CharField(max_length=128, default="default category")
    content = models.CharField(max_length=65536, default="enter your content here")
    index = models.IntegerField(default=1)
    color = models.CharField(max_length=128, default="green")
    def __unicode__(self):  # 相当于toString
        return "%s's note %s" % (self.user, self.title)
