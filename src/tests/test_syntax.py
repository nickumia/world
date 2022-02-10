from flask import url_for, json

from conftest import SERVER_NAME


def test_api_syntax(client, app):
    """Test the home page redirect."""

    with app.app_context():
        rv = client.post(url_for('nlp.syntax_groups'),
                         data="This is a simple sentence.")

    response = json.loads(rv.data.decode('utf-8'))
    assert response == {
        'alpha_char_only': ['This', 'is', 'a', 'simple', 'sentence'],
        'sentences_only': ['This is a simple sentence.']
    }
    assert rv.status_code == 200
