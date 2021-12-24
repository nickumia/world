from flask import url_for, request

from test_nlp_app import *


def test_home(client, app):
    """Start with a blank database."""

    with app.app_context():
        rv = client.get(url_for('nlp.index'))
    assert b'NLP' in rv.data
