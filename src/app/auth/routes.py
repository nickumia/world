import time
from urllib.parse import urlparse

from flask import render_template, flash, redirect, url_for, request
from flask_login import current_user, login_user, logout_user

from app import db
from app.auth.forms import LoginForm, RegistrationForm, ResetPasswordForm, \
                      ResetPasswordRequestForm

from app.auth.models import Users
from . import bp


@bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('nlp.index'))
    form = RegistrationForm(time.time())
    if form.validate_on_submit():
        user = Users(id=time.time(), username=form.username.data,
                     email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('auth.login'))
    return render_template('auth/register.html', section='Register',
                           title='Register', form=form)


@bp.route('/reset_password_request', methods=['GET', 'POST'])
def reset_password_request():
    if current_user.is_authenticated:
        return redirect(url_for('nlp.index'))
    form = ResetPasswordRequestForm()
    if form.validate_on_submit():
        user = Users.query.filter_by(email=form.email.data).first()
        if user:
            # send_password_reset_email(user)
            token = user.get_reset_password_token()
            return render_template('auth/reset_password_request_fake.html',
                                   user=user, title='Reset Password',
                                   token=token)
        # flash('Check your email for the instructions to reset your password')
        # return redirect(url_for('auth.login'))
    return render_template('auth/reset_password_request.html',
                           section='Reset Password',
                           title='Reset Password', form=form)


@bp.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    if current_user.is_authenticated:
        return redirect(url_for('nlp.index'))
    user = Users.verify_reset_password_token(token)
    if not user:
        return redirect(url_for('nlp.index'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        db.session.commit()
        flash('Your password has been reset.')
        return redirect(url_for('auth.login'))
    return render_template('auth/reset_password.html',
                           section='Reset Password', form=form)


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('nlp.index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = Users.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('auth.login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or urlparse(next_page).netloc != '':
            next_page = url_for('nlp.index')
        return redirect(next_page)
    return render_template('auth/login.html', section='Login',
                           title='Sign In', form=form)


@bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('nlp.index'))
