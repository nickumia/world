# Parry, Lalita and Nick Welcome Pages
import os

filepath = '/'.join(os.path.realpath(__file__).split('/')[0:-1]) + '/'

with open(filepath + 'spiritual.html') as f:
    spiritual_post = f.read()

spiritual = {
    "title": "ॐ Spiritual Resources ॐ",
    "posted_time": "February 14th, 2024",
    "body": spiritual_post
}
