from app import db
from flask import render_template
from . import bp


@bp.app_errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html', section='Error'), 404


@bp.app_errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('errors/500.html', section='Error'), 500


@bp.route('/coming_soon')
def test1():
    return render_template('errors/coming_soon.html',
                           section='Coming Soon!'), 218
