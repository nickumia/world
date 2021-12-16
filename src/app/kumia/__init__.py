from flask import Blueprint

bp = Blueprint('kumia', __name__)

from app.kumia import routes
