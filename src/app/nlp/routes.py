import sys
import json
import time
from datetime import datetime

from flask import render_template, flash, redirect, url_for, request
from flask_login import current_user, login_user, logout_user, login_required

from app import db
from app.auth.models import Users
from app.nlp.models import Posts
from app.nlp.selection import getSelection
from app.nlp.model_pages import asteroid_parry_json, asteroid_lalita_json, asteroid_nick_json, \
        openings_parry, openings_lalita, openings_nick

from . import bp

@bp.route('/secret')
@login_required
def secret():
    return "sshhhhh, this is secret :)"

@bp.route('/test1')
def test1():
    return "I'm open and free!!"

@bp.route('/test2')
def test2():
    return "I'm not sure what I am"

@bp.route('/elastic_index')
def elastic_index():
    Posts.reindex()
    return render_template('indexed.html', section='Posts', user=current_user)

@bp.route('/processing')
def processing():
    return render_template('realm.html',
                           section='Processing',
                           user=current_user,
                           domain=json.dumps(openings_parry),
                           asteroids=json.dumps(asteroid_parry_json))

@bp.route('/language')
def language():
    return render_template('realm.html',
                           section='Language',
                           user=current_user,
                           domain=json.dumps(openings_lalita),
                           asteroids=json.dumps(asteroid_lalita_json))

@bp.route('/natural')
def natural():
    return render_template('realm.html',
                           section='Natural Core',
                           user=current_user,
                           domain=json.dumps(openings_nick),
                           asteroids=json.dumps(asteroid_nick_json))


@bp.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()

@bp.route('/', methods=['GET'])
@bp.route('/index')
def index():
    return render_template('index.html',
                           section='Natural Language Processing',
                           selection=json.dumps(getSelection()),
                           user=current_user)

@bp.route('/posts')
def blogs():
    posts = Posts.query.order_by(Posts.posted_time.desc()).all()
    posts_json = []

    avatar_dict = {
        '0' : 'processing',
        '1' : 'language',
        '2' : 'natural'
    }

    for post in posts:
        transform = post.to_dict()
        transform['link'] = url_for('nlp.post', post_id=transform['id'])
        transform['avatar'] = avatar_dict[transform['author']]
        posts_json.append(transform)
    return render_template('posts.html', section='Posts', posts=json.dumps(posts_json))

@bp.route('/posts/<post_id>')
def post(post_id):
    if post_id == '106':
        return redirect(url_for('nlp.processing'), code=302)
    if '107' in post_id:
        return redirect(url_for('nlp.language'), code=302)
    if post_id == '108':
        return redirect(url_for('nlp.natural'), code=302)
    post_dict = Posts.query.get(post_id).to_dict()
    return render_template('post.html', section='Posts', post=json.dumps(post_dict))
