from flask import url_for

from conftest import SERVER_NAME


def test_home(client, app):
    """Test the home page redirect."""

    with app.app_context():
        rv = client.get(url_for('index'))
    assert ('You should be redirected automatically to target URL: <a '
            'href="/nlp/index">/nlp/index</a>.') in str(rv.data)
    assert rv.status_code == 302

    """Test the home page"""

    with app.app_context():
        rv = client.get(url_for('nlp.index'))
    assert 'id="appselector"' in str(rv.data)
    assert rv.status_code == 200


def test_kumia(client, app):
    """ Test personal home page redirect. """

    with app.app_context():
        rv = client.get(url_for('kumia'))
    assert ('You should be redirected automatically to target URL: <a href="'
            'http://'+SERVER_NAME+'/kumia/">http://'+SERVER_NAME+'/kumia/'
            '</a>.') in str(rv.data)
    assert rv.status_code == 308

    """ Test personal home page. """

    with app.app_context():
        rv = client.get(url_for('kumia.resume'))
    assert 'id="kumia"' in str(rv.data)
    assert rv.status_code == 200


def test_auth_register(client, app):
    """ Test registering new account. """

    with app.app_context():
        rv = client.get(url_for('auth.register'))

    assert ('<p><input id="submit" name="submit" type="submit" '
            'value="Register"></p>') in str(rv.data)
    assert rv.status_code == 200

    # TODO: when tests are run with full context (DB), enable this,
    # with app.app_context():
    #     rv = client.post(url_for('auth.register'), data={'username': 'test',
    #                                               'email': 'test@asdf.com',
    #                                                   'password': 'asdf',
    #                                                   'password2': 'asdf'})


def test_auth_reset_password(client, app):
    """ Test resetting password. """

    with app.app_context():
        rv = client.get(url_for('auth.reset_password_request'))

    assert ('<p><input id="submit" name="submit" type="submit" '
            'value="Request Password Reset"></p>') in str(rv.data)
    assert rv.status_code == 200


# TODO: Add test for url_for('auth.reset_password_request')
# TODO: Add test for url_for('auth.reset_password')


def test_auth_login_loads(client, app):
    """ Test login page loads. """

    with app.app_context():
        rv = client.get(url_for('auth.login'))

    assert ('<p><input id="submit" name="submit" type="submit" '
            'value="Sign In"></p>') in str(rv.data)
    assert rv.status_code == 200


# TODO: Add successful login test when DB is available
# TODO: Add unsuccessful login test when DB is available
# def test_auth_login_bad(client,app):
#     """ Test bad login attempt. """
#
#     with app.app_context():
#         rv0 = client.get(url_for('auth.login'))
#         rv = client.post(url_for('auth.login'), data={'username': 'test',
#                                                      'password': 'test'})
#
#     print(rv0.data)
#     assert 'Invalid username or password' in str(rv.data)
# TODO: Add logout test when DB is available
