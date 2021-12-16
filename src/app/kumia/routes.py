import json
import time
from datetime import datetime

from flask import render_template, flash, redirect, url_for, request
from flask_login import current_user, login_user, logout_user, login_required

from app.kumia.resume import publications, experiences, educations
from . import bp


@bp.route('/', methods=['GET'])
def resume():
    return render_template('kumia.html',
                           section='Kumia',
                           title='Resume',
                           user=current_user,
                           pubs=json.dumps(publications),
                           work=json.dumps(experiences),
                           edu=json.dumps(educations))
