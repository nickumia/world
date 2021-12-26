import jinja2
from cryptography.fernet import Fernet
import flask

bp = flask.Blueprint('encryption', __name__)

# using the decorator
@jinja2.contextfilter
@bp.app_template_filter()
def encryptdata(context, value):
    return value


def encryption_algorithm(data):
    return data+"asdfasdf"
