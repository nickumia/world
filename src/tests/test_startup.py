# Test the initialize() called from main.py

# import base64
from flask import url_for
import os
import time

from app import wait
from app.nlp.posts.all import initialize
# from app.encryption import decryptdata


def init(app, client):
    """ Test startup, wait for services, initial data entry. """
    wait.postgres(os.getenv('POSTGRES_DB', 'postgres'),
                  os.getenv('POSTGRES_USER', 'postgres'),
                  os.getenv('POSTGRES_HOST', 'db'),
                  os.getenv('POSTGRES_PASS', 'pass'))
    initialize(app)


def test_blogs(client, app):
    """ Test explore all blogs page. """
    init(app, client)

    raw = None
    with app.app_context():
        rv = client.get(url_for('nlp.blogs'))
        response = str(rv.data)
        # Assume the longest string is the encoded data **sweat_smile**
        # encoded = max(response.split('"'), key=len)[:-2]
        # raw = str(decryptdata({}, base64.b64decode(encoded), bypass=True))
    raw = response
    assert ("Introduction (2018)") in raw
    assert ("I sense that you sense that ... WE ALL SENSE") in raw
    assert ("Sensing the world, No Senses Required... jk!") in raw
    assert ("Be Formless, Shapeless like wa.. no, no, no.. like Senses") \
        in raw
    assert ("I AM a Language (:") in raw
    assert ("Yeh \\\\u0027consciousness\\\\u0027 kya hai?") in raw
    assert rv.status_code == 200


def test_blog_normal(client, app):
    """ Test a normal post page """

    raw = None
    with app.app_context():
        rv = client.get(url_for('nlp.post', post_id=101))
        response = str(rv.data)
        # encoded = max(response.split('"'), key=len)[:-2]
        # raw = str(decryptdata({}, base64.b64decode(encoded), bypass=True))
    raw = response
    assert ('\\\\"title\\\\": \\\\"I sense that you sense that ... WE '
            'ALL SENSE\\\\"') in raw
    assert ('\\\\"id\\\\": 101') in raw
    assert ('\\\\"body\\\\": \\\\"\\\\u003cp\\\\u003eAs humans') in raw
    assert rv.status_code == 200


def test_blog_redirect(client, app):
    """ Test a post page that redirects to all model pages """

    with app.app_context():
        rv = client.get(url_for('nlp.post', post_id=997))
    assert ('You should be redirected automatically to the target URL: <a '
            'href="/nlp/processing">/nlp/processing</a>.') in str(rv.data)
    assert rv.status_code == 302

    with app.app_context():
        rv = client.get(url_for('nlp.post', post_id=998))
    assert ('You should be redirected automatically to the target URL: <a '
            'href="/nlp/language">/nlp/language</a>.') in str(rv.data)
    assert rv.status_code == 302
    with app.app_context():
        rv = client.get(url_for('nlp.post', post_id=999))
    assert ('You should be redirected automatically to the target URL: <a '
            'href="/nlp/natural">/nlp/natural</a>.') in str(rv.data)
    assert rv.status_code == 302
    with app.app_context():
        rv = client.get(url_for('nlp.post', post_id=900))
    assert ('You should be redirected automatically to the target URL: <a '
            'href="/nlp/syntax">/nlp/syntax</a>.') in str(rv.data)
    assert rv.status_code == 302
