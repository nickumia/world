import os

from app.nlp.models import Posts
from app.auth.models import Users
from app import db

filepath = '/'.join(os.path.realpath(__file__).split('/')[0:-1]) + '/'

def initialize(app):
    with app.app_context():
        parry = Users(id=0,
                      username='parry',
                      email='parry@kamutiv.com')
        lalita = Users(id=1,
                      username='lalita',
                      email='lalita@kamutiv.com')
        nick = Users(id=2,
                      username='nick',
                      email='nick@kamutiv.com')
        all_users = Users.query.all()

        if nick not in all_users:
            db.session.add(parry)
            db.session.add(lalita)
            db.session.add(nick)
            db.session.commit()

            with open(filepath+'introduction_legacy.html','r') as f:
                intro_body = f.read()
            intro = Posts(id=100,
                          title="Introduction (2018)",
                          body=intro_body,
                          author=nick)
            db.session.add(intro)
            db.session.commit()
    
