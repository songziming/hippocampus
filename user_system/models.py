# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    nickname = models.CharField(max_length=80)
    signature = models.CharField(max_length=200)
    def __unicode__(self):  # 相当于toString
        return "%s's profile" % self.user

def autoCreateUserProfile(sender, instance, created, **kwargs):
    if created:
        profile, created = UserProfile.objects.get_or_create(user=instance)

post_save.connect(autoCreateUserProfile, sender=User)
