from flask import url_for


def test_auth_register(client, app):
    """ Test registering new account. """

    with app.app_context():
        rv = client.post(url_for('auth.register'), data={
            'username': 'test',
            'email': 'test@asdf.com',
            'password': 'asdf',
            'password2': 'asdf'})

    assert False

def test_auth_login(client, app):
    """ Test login with default user. """

    with app.app_context():
        rv0 = client.get(url_for('auth.login'))
        crsf_index = rv0.data.find(b'csrf_token" type="hidden" value="')
        offset = len('csrf_token" type="hidden" value="')
        crsf_token = rv0.data[crsf_index+offset:crsf_index+124]
        rv = client.post(url_for('auth.login'), data={
            'username': 'asdf',
            'password': 'asdf',
            'crsf_token': crsf_token,
            'submit': 'Sign In'})

    print(rv.data)
    print(rv.status_code)
    assert False
