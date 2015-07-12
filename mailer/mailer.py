#! /usr/bin/env python
# -*- coding: utf8 -*-

import threading
import imaplib
import os
import email
import base64
import datetime
from email.utils import parsedate
from user_system.models import User, UserProfile

# class Crawler:
def chTupleToDatetime(arg):
    return datetime.datetime(*parsedate(arg)[:6])

def getLastMail(address,password,lasttime = datetime.datetime.min):
    pos = address.find('@')
    host = "imap."+address[pos+1:]
    username = address[0:pos]#"buaasoft2012"
    con = imaplib.IMAP4(host)
    con.login(username,password)
    con.select("INBOX")
    type, data = con.search(None, 'ALL')
    msgList = data[0].split()
    last = msgList[-1]
    #print last
    content = con.fetch(last,'(UID BODY.PEEK[])')
    #print content
    code = content[1][0][1]
    msg = email.message_from_string(code)
    date = msg.get("Date")
    date = chTupleToDatetime(date)
    if(date<=lasttime):
        return {"status":1}
    subject = msg.get("subject")
    charset = "utf-8"
    if(subject.find("=?")==0):
        data = subject.split('?')
        subject = data[3]
        charset = data[1].lower()
        subject = base64.b64decode(subject)
        subject = subject.decode(charset).encode('utf-8')


    sender = msg.get("from")
    sender = sender[sender.find('<')+1:sender.find('>')]

    content = "";

    for par in msg.walk():
        if not par.is_multipart():
            name = par.get_param("name") #如果是附件，这里就会取出附件的文件名
            if not name:
#                #有附件
#                # 下面的三行代码只是为了解码象=?gbk?Q?=CF=E0=C6=AC.rar?=这样的文件名
#                h = email.Header.Header(name)
#                dh = email.Header.decode_header(h)
#                fname = dh[0][0]
#                print '附件名:', fname
#                data = par.get_payload(decode=True) #　解码出附件数据，然后存储到文件中
#
#                try:
#                    f = open(fname, 'wb') #注意一定要用wb来打开文件，因为附件一般都是二进制文件
#                except:
#                    print '附件名有非法字符，自动换一个'
#                    f = open('aaaa', 'wb')
#                f.write(data)
#                f.close()
#            else:
                content += par.get_payload(decode=True)
            #print '+'*60 # 用来区别各个部分的输出
    content = content.decode(charset).encode("utf-8")
    res = {}
    res["sender"] = sender
    res["subject"] = subject
    res["date"] = date
    res["content"] = content;
    res["status"] = 0;
    return res

def getAllMails():
    profiles = UserProfile.objects.all()
    for p in profiles:
        u = p._meta.get_field('user').rel.to
        mailaddr = u.email
        password = p.emailPasswd
        mail = getLastMail(mailaddr, password)
        print mailaddr,password
        notes.views.__create_notes__(user = u, title=mail["subject"], content=mail["content"])
    #threading.Timer(10, getAllMails).start()

def start():
    getAllMails()


res = getLastMail("lmysoar@163.com","lmy159357")
print res["sender"] 
print res["subject"]
print res["date"] 
print res["content"]
print res["status"] 