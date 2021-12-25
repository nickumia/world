import json

from flask import render_template
from flask_login import current_user

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
