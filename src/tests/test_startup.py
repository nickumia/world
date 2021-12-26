# Test the initialize() called from main.py

from flask import url_for
import os

from app import wait
from app.nlp.posts.all import initialize


def init(app):
    """ Test startup, wait for services, initial data entry. """
    wait.postgres(os.getenv('POSTGRES_DB'),
                  os.getenv('POSTGRES_USER'),
                  os.getenv('POSTGRES_HOST'),
                  os.getenv('POSTGRES_PASS'))
    wait.elastics(app.elasticsearch)
    initialize(app)


def test_blogs(client, app):
    """ Test explore all blogs page. """
    init(app)

    with app.app_context():
        rv = client.get(url_for('nlp.blogs'))
    response = str(rv.data)
    assert ("Introduction (2018)") in response
    assert ("I sense that you sense that ... WE ALL SENSE") in response
    assert ("Sensing the world, No Senses Required... jk!") in response
    assert ("Be Formless, Shapeless like wa.. no, no, no.. like Senses") \
        in response
    assert ("I AM a Language (:") in response
    assert ("Yeh \\\\u0027consciousness\\\\u0027 kya hai?") in response
    assert rv.status_code == 200


def test_blog_normal(client, app):
    """ Test a normal post page """

    with app.app_context():
        rv = client.get(url_for('nlp.post', post_id=101))
    response = str(rv.data)
    assert ('\\\\"title\\\\": \\\\"I sense that you sense that ... WE '
            'ALL SENSE\\\\"') in response
    assert ('\\\\"id\\\\": 101') in response
    assert ('\\\\"body\\\\": \\\\"\\\\u003cp\\\\u003eAs humans') in response
    assert rv.status_code == 200


def test_blog_redirect(client, app):
    """ Test a post page that redirects to all model pages """

    with app.app_context():
        rv = client.get(url_for('nlp.post', post_id=997))
    assert ('You should be redirected automatically to target URL: <a '
            'href="/nlp/processing">/nlp/processing</a>.') in str(rv.data)
    assert rv.status_code == 302

    with app.app_context():
        rv = client.get(url_for('nlp.post', post_id=998))
    assert ('You should be redirected automatically to target URL: <a '
            'href="/nlp/language">/nlp/language</a>.') in str(rv.data)
    assert rv.status_code == 302
    with app.app_context():
        rv = client.get(url_for('nlp.post', post_id=999))
    assert ('You should be redirected automatically to target URL: <a '
            'href="/nlp/natural">/nlp/natural</a>.') in str(rv.data)
    assert rv.status_code == 302


def test_search_results(client, app):
    """ Test that the search API works """

    with app.app_context():
        rv = client.get(url_for('search.search', q="world"))
    response = str(rv.data)
    print(response)
    assert ('{\\\\"key\\\\": 1, \\\\"name\\\\": \\\\"Parry\\\\u0027s '
            'Processing\\\\", \\\\"link\\\\": \\\\"/nlp/posts/997\\\\"'
            ', \\\\"summary\\\\": \\\\"Query context score (non-normalized)'
            ': 0.50\\\\"}') in response
    assert rv.status_code == 200
