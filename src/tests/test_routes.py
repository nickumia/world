from flask import url_for, request

from test_nlp_app import *


def test_home(client, app):
    """Test the home page redirect."""

    with app.app_context():
        rv = client.get(url_for('index'))
    assert 'You should be redirected automatically to target URL: <a href="/nlp/index">/nlp/index</a>.' in str(rv.data)
    assert rv.status_code == 302

    """Test the home page"""

    with app.app_context():
        rv = client.get(url_for('nlp.index'))
    assert 'id="appselector"' in str(rv.data)


def test_kumia(client, app):
    """Test personal home page redirect."""

    with app.app_context():
        rv = client.get(url_for('kumia'))
    print(str(rv.data))
    print(rv.status_code)
    assert 'You should be redirected automatically to target URL: <a href="http://'+SERVER_NAME+'/kumia/">http://'+SERVER_NAME+'/kumia/</a>.' in str(rv.data)
    assert rv.status_code == 308

    """Test personal home page"""

    with app.app_context():
        rv = client.get(url_for('kumia.resume'))
    assert 'id="kumia"' in str(rv.data)

