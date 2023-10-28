# General Company pages

import os

filepath = '/'.join(os.path.realpath(__file__).split('/')[0:-1]) + '/'

with open(filepath + 'privacy.html') as f:
    privacy_notice = f.read()

privacy = {
    "title": "Privacy + Data Policies",
    "posted_time": "",
    "body": privacy_notice
}
