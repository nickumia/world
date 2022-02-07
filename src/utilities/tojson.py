
from flask import json as fjson
import json
import sys

from app.nlp.model_pages import \
    asteroid_parry_json, asteroid_lalita_json, asteroid_nick_json, \
    openings_parry, openings_lalita, openings_nick
from app.kumia.resume import publications, experiences, educations

# Processing page
if sys.argv[1] == 'processing':
    print("domain=" + fjson.htmlsafe_dumps(json.dumps(openings_parry)))
    print("asteroids=" + fjson.htmlsafe_dumps(json.dumps(asteroid_parry_json)))

# Language page
if sys.argv[1] == 'language':
    print("domain=" + fjson.htmlsafe_dumps(json.dumps(openings_lalita)))
    print("asteroids=" + fjson.htmlsafe_dumps(json.dumps(asteroid_lalita_json)))

# Natural page
if sys.argv[1] == 'natural':
    print("domain=" + fjson.htmlsafe_dumps(json.dumps(openings_nick)))
    print("asteroids=" + fjson.htmlsafe_dumps(json.dumps(asteroid_nick_json)))

# Kumia page
if sys.argv[1] == 'kumia':
    print("work=" + fjson.htmlsafe_dumps(json.dumps(experiences)))
    print("pubs=" + fjson.htmlsafe_dumps(json.dumps(publications)))
    print("edu=" + fjson.htmlsafe_dumps(json.dumps(educations)))
