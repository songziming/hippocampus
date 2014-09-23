# -*- coding: utf8 -*-

import imaplib
import os
import email
import base64

def getLastMail(address,password):
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
    #print code
    msg = email.message_from_string(code)
    subject = msg.get("subject")
    #print subject
    data = subject.split('?')
    subject = data[3]
    #print subject
    subject = base64.b64decode(subject)
    #print subject
    subject = subject.decode(data[1]).encode('utf-8')
    #print subject
    content = msg.get("content")
    #print content

    sender = msg.get("Sender")
    date = msg.get("Date")
    content = "";

    for par in msg.walk():
        if not par.is_multipart(): 
            name = par.get_param("name") #如果是附件，这里就会取出附件的文件名
            if name:
                #有附件
                # 下面的三行代码只是为了解码象=?gbk?Q?=CF=E0=C6=AC.rar?=这样的文件名
                h = email.Header.Header(name)
                dh = email.Header.decode_header(h)
                fname = dh[0][0]
                print '附件名:', fname
                data = par.get_payload(decode=True) #　解码出附件数据，然后存储到文件中
                
                try:
                    f = open(fname, 'wb') #注意一定要用wb来打开文件，因为附件一般都是二进制文件
                except:
                    print '附件名有非法字符，自动换一个'
                    f = open('aaaa', 'wb')
                f.write(data)
                f.close()
            else:#不是附件，是文本内容
                #print "*"*60
                #print par.get_payload(decode=True) # 解码出文本内容，直接输出来就可以了。
                content = par.get_payload(decode=True)
            #print '+'*60 # 用来区别各个部分的输出
    res = {}
    res["sender"] = sender
    res["subject"] = subject
    res["date"] = date
    res["content"] = content;
    return res
