# Parry, Lalita and Nick Welcome Pages
import os

filepath = '/'.join(os.path.realpath(__file__).split('/')[0:-1]) + '/'

with open(filepath + '2023_london.html') as f:
    london_post = f.read()

london = {
    "title": "London 2023",
    "posted_time": "October 23rd, 2023",
    "body": london_post
}
