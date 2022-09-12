from flask import url_for
# from flask_login import current_user

from conftest import SERVER_NAME


def test_home(client, app):
    """Test the home page redirect."""

    with app.app_context():
        rv = client.get(url_for('index'))
    assert ('You should be redirected automatically to the target URL: <a '
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
        rv = client.get("/kumia")
    possible = ['http://'+SERVER_NAME, '']
    at_least_one = []

    for p in possible:
        at_least_one.append(('You should be redirected automatically to the'
                             ' target URL: <a href="%s/kumia/">%s/kumia/</a>.'
                             % (p, p)) in str(rv.data))
    assert any(at_least_one)
    assert rv.status_code == 308

    """ Test personal home page. """

    with app.app_context():
        rv = client.get(url_for('kumia.resume'))
    assert 'id="kumia"' in str(rv.data)
    assert rv.status_code == 200


def test_favicon(client, app):
    """ Test favicon.ico load """

    with app.app_context():
        rv = client.get("/favicon.ico")
    assert (b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR') \
        in rv.data
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
# def test_login(client, app):
#     """ Test user login """
#
#     with app.app_context():
#         rv = client.post(url_for('auth.login'), data={'username': 'asdf',
#                                                  'password': 'asdf'})
#         assert current_user.username == 'asdf'

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


def test_error_404(client, app):
    """ Test 404 for nonexistant routes. """

    with app.app_context():
        rv = client.get("/asdf")

    assert ('Information Not Found') in str(rv.data)
    assert rv.status_code == 404


def test_error_500(client, app):
    """ Test 500 for server errors. """

    with app.app_context():
        rv = client.get("/test_500/500")

    assert ('The administrator has been notified. Sorry for the '
            'inconvenience!') in str(rv.data)
    assert rv.status_code == 500


def test_coming_soon(client, app):
    """ Test coming soon page. """

    with app.app_context():
        rv = client.get("/coming_soon")

    assert ('&#128679; My Apologies.  This section is still under '
            'construction. &#128679;') in str(rv.data)
    assert rv.status_code == 218


def test_nlp_realm(client, app):
    """ Test processing/language/natural routes. """

    with app.app_context():
        rv = client.get(url_for("nlp.processing"))

    assert 'id="realm"' in str(rv.data)
    assert rv.status_code == 200

    with app.app_context():
        rv = client.get(url_for("nlp.language"))

    assert 'id="realm"' in str(rv.data)
    assert rv.status_code == 200

    with app.app_context():
        rv = client.get(url_for("nlp.natural"))

    assert 'id="realm"' in str(rv.data)
    assert rv.status_code == 200
