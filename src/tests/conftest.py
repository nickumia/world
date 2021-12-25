import pytest

from app import create_app


SERVER_NAME = 'localhost:8000'


@pytest.fixture
def app():
    app = create_app()
    yield app


@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()


def login(client, username, password):
    return client.post('/login', data=dict(
        username=username,
        password=password
    ), follow_redirects=True)


def logout(client):
    return client.get('/logout', follow_redirects=True)
