from flask import Flask, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_moment import Moment
from elasticsearch import Elasticsearch

import logging
from logging.handlers import RotatingFileHandler
import os

from app.config import Config

db = SQLAlchemy()
login = LoginManager()
login.login_view = 'auth.login'
moment = Moment()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    login.init_app(app)
    moment.init_app(app)
    app.elasticsearch = Elasticsearch([app.config['ELASTICSEARCH_URL']]) \
            if app.config['ELASTICSEARCH_URL'] else None

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from app.nlp import bp as nlp_bp
    app.register_blueprint(nlp_bp, url_prefix='/nlp')

    from app.search import bp as search_bp
    app.register_blueprint(search_bp, url_prefix='/search')

    from app.kumia import bp as kumia_bp
    app.register_blueprint(kumia_bp, url_prefix='/kumia')

    @app.route('/')
    @app.route('/index')
    def index():
        return redirect(url_for("nlp.index"), code=302)

    @app.route('/kumia')
    def kumia():
        return redirect(url_for("kumia.resume"), code=302)


    if not app.debug:
        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/nlp.log', maxBytes=10240,
                                           backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('NLP app startup')

    
    return app
