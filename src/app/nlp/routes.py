import time
from datetime import datetime

from flask import render_template, flash, redirect, url_for, request
from flask_login import current_user, login_user, logout_user, login_required

from app import db
from app.auth.models import Users

from . import bp

@bp.route('/secret')
@login_required
def secret():
    return "sshhhhh, this is secret :)"

@bp.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()

@bp.route('/')
@bp.route('/index')
def index():
    intros = [
        {
            'liason': 'Perry',
            'speech': 'Pleasure to be acquainted!'
        },
        {
            'liason': 'Lalita',
            'speech': '**squints eyes as she turns to do something**'
        },
        {
            'liason': 'Nick',
            'speech': 'Welcome, I hope you find yourself at home.'
        }
    ]
    return render_template('index.html', section='Natural Language Processing', intros=intros, user=current_user)
