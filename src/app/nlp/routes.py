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

@bp.route('/processing')
def processing():
    asteroids_json = [
        {"key": 0,
         "type": "Basic Text",
         "phrase": "The most \"natural\" language to a computer",
         "description": """
• Machines are very simple.  They are not hardwired with things like feelings, emotions, self-awareness, consciousness...<br/>
• Despite the inability of text to store and retain these things, there are many sources of text and writing where these things are perceived and conveyed to some degree.  When reading a book, an article, a blog, there is a "voice" that is present that influences your understanding of the words used.<br/>
• The idea is to be able to process the text with an understanding that there is (1) the Intended Meaning and (2) the Perceived Meaning, neither of which may be known at any given time.""",
         "subject": [
            {"type": "Syntax/Grammar", "description": "Defining the basic unit of text, understanding how these units interact and combine into larger units..", "link": "test.com", "key": 0},
            {"type": "Semantics", "description": "The \"Sentence meaning\"", "link": "test.com", "key": 1},
            {"type": "Pragmatics", "description": "The \"Speaker meaning\"", "link": "test.com", "key": 2}
         ],
        },
        {"key": 1,
         "type": "Speech Audio",
         "phrase": "The most \"natural\" language for humans",
         "description": """
• There is a lot of information ingrained in the sounds that humans hear.  We can distinguish non-living sounds from sounds of the living, harmonious melodies and discords of noise.<br/>
• Assuming we discern a sound as speech, our understanding of the words spoken is influenced by our recognition of various defining characteristics, such as tone, pitch and loudness.  It's important to note that extracting the speaker's meaning is no easy task.<br/>
• Think about how many different people pronounce the same words differently ... Think about all of the different accents that exist ... The point is to understand how all of these factors effect a word's meaning.""",
         "subject": [
            {"type": "Phonetics", "description": "Understanding the physical properties of speech", "link": "test.com", "key": 1},
            {"type": "Phonology", "description": "Using the physical properties to create meaning structures", "link": "test.com", "key": 2},
            {"type": "Morphology", "description": "Understanding the flexibilities of these structures", "link": "test.com", "key": 3}
         ]
        },
        {"key": 2,
         "type": "Seeing the World",
         "phrase": "The language no one talks about",
         "description": """
Much of the world is never explicitly talked about.  When we talk, we often assume things that make up the context of what is being said.  Consider the following conversation,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;A: What is that?<br/>
&nbsp;&nbsp;&nbsp;&nbsp;B: I'm not sure.  They've been here for a while now.<br/>
Without visual knowledge of the world, there is no way a computer would know what "that" refers to.  Granted, with a longer conversation, "that" may become known.  However, a human with vision would have a much different understanding of the conversation.
         """,
         "subject": [
            {"type": "Real-world Objects", "description": "What makes up the world around us", "link": "test.com", "key": 1},
            {"type": "Reference Clues", "description": "Understanding how things are connected", "link": "test.com", "key": 2},
            {"type": "Object Definitions / Relations", "description": "What defines an object, it's functions and properties", "link": "test.com", "key": 3}
         ]
        }
    ]
    return render_template('processing.html',
                           section='Processing',
                           user=current_user,
                           asteroids=json.dumps(asteroids_json))

@bp.route('/language')
def language():
    return render_template('language.html',
                           section='Language',
                           user=current_user)

@bp.route('/natural')
def natural():
    return render_template('natural.html',
                           section='Natural Core',
                           user=current_user)


@bp.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()

@bp.route('/')
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
    post_dict = Posts.query.get(post_id).to_dict()
    return render_template('post.html', section='Posts', post=json.dumps(post_dict))
