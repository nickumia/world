from datetime import datetime

from flask import g, render_template, redirect, url_for, request, current_app
from flask_login import current_user

from app.search.forms import SearchForm
from app import db

from . import bp

@bp.before_app_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
    db.session.commit()
    g.search_form = SearchForm()

@bp.route('/')
def search():
    from app.nlp.models import Posts
    # if not g.search_form.validate():
    #     # TODO: Update link when there's a general explore page
    #     return redirect(url_for('nlp.index'))
    page = request.args.get('page', 1, type=int)
    # TODO: Search Model when there is information in model to search
    posts, total = Posts.search(g.search_form.q.data, page,
                               current_app.config['RESULTS_PER_PAGE'])
    # next_url = url_for('search.search', q=g.search_form.q.data, page=page + 1) \
    #     if total > page * current_app.config['RESULTS_PER_PAGE'] else None
    # prev_url = url_for('search.search', q=g.search_form.q.data, page=page - 1) \
    #     if page > 1 else None
    posts = []
    next_url = ""
    prev_url = ""
    return render_template('search.html', section='Search Results', title='Search', posts=posts,
                           next_url=next_url, prev_url=prev_url)
