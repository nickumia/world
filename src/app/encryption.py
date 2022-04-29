import base64
import jinja2
import json
from cryptography.fernet import Fernet
from flask import current_app, Blueprint

bp = Blueprint('encryption', __name__)


@jinja2.pass_context
@bp.app_template_filter()
def encryptdata(context, value):
    a = Fernet(current_app.config['ENCRYPTION_KEY'])
    return json.dumps({
        'data': base64.b64encode(a.encrypt(
            value.encode('utf8'))).decode('ascii')
    })


@jinja2.pass_context
@bp.app_template_filter()
def decryptdata(context, value, bypass=False):
    a = Fernet(current_app.config['ENCRYPTION_KEY'])
    if bypass:
        return a.decrypt(value)
    else:
        return a.decrypt(base64.b64decode(json.loads(value)['data']))
