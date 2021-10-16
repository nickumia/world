from flask import Blueprint

bp = Blueprint('nlp', __name__)

from app.nlp import routes
