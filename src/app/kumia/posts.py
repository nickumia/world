# Parry, Lalita and Nick Welcome Pages
import os

filepath = '/'.join(os.path.realpath(__file__).split('/')[0:-1]) + '/'

with open(filepath + 'spiritual.html') as f:
    spiritual_post = f.read()
with open(filepath + '20141228.html') as f:
    d20141228_post = f.read()

spiritual = {
    "title": "ॐ Spiritual Resources ॐ",
    "posted_time": "February 14th, 2024",
    "body": spiritual_post
}
d20141228 = {
    "title": "One of many beginnings",
    "posted_time": "December 28th, 2014 | 12:09 AM",
    "body": d20141228_post
}
