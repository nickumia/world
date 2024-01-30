# Parry, Lalita and Nick Welcome Pages
import os

filepath = '/'.join(os.path.realpath(__file__).split('/')[0:-1]) + '/'

with open(filepath + '2023_london.html') as f:
    london_post = f.read()

with open(filepath + '2023_new_york.html') as f:
    new_york_post = f.read()

with open(filepath + '2024_spiritual_tech.html') as f:
    spiritual_tech_post = f.read()

london = {
    "title": "London: A Turn of a New Leaf 🍂",
    "posted_time": "October 14 - 22, 2023",
    "body": london_post
}

new_york = {
    "title": "New York: Reframing the Past 💣",
    "posted_time": "December 9 - 26, 2023",
    "body": new_york_post
}

spiritual_tech = {
    "title": "Spiritual Tech: A Road Trip Across America 🛣️",
    "posted_time": "2024",
    "body": spiritual_tech_post
}
