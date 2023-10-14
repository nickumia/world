
import flask
import json
import sys

from app.nlp.model_pages import \
    asteroid_parry_json, asteroid_lalita_json, asteroid_nick_json, \
    openings_parry, openings_lalita, openings_nick
from app.kumia.resume import publications, experiences, educations

# Processing page
if sys.argv[1] == 'processing':
    print("domain=" + flask.json.dumps(json.dumps(openings_parry)))
    print("asteroids=" + flask.json.dumps(json.dumps(
        asteroid_parry_json)))

# Language page
if sys.argv[1] == 'language':
    print("domain=" + flask.json.dumps(json.dumps(openings_lalita)))
    print("asteroids=" + flask.json.dumps(json.dumps(
        asteroid_lalita_json)))

# Natural page
if sys.argv[1] == 'natural':
    print("domain=" + flask.json.dumps(json.dumps(openings_nick)))
    print("asteroids=" + flask.json.dumps(json.dumps(
        asteroid_nick_json)))

# Kumia page
if sys.argv[1] == 'kumia':
    print("work=" + flask.json.dumps(json.dumps(experiences)))
    print("pubs=" + flask.json.dumps(json.dumps(publications)))
    print("edu=" + flask.json.dumps(json.dumps(educations)))
