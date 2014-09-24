#! /usr/bin/env python

from django.db import connection

# connection.text_factory = str
import mailer

mailer.startGetMailer()