import datetime
import os
import sys

from app.nlp.models import Posts
from app.nlp.model_pages import *
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
                          subtitle="End of the begining, because there never truly is a beginning",
                          body=intro_body,
                          author=nick)
            intro.posted_time = datetime.datetime(2018, 11, 30)

            with open(filepath+'senses.html','r') as f:
                intro_body = f.read()
            senses = Posts(id=101,
                          title="I sense that you sense that ... WE ALL SENSE",
                          subtitle="Without senses, what would we know?",
                          body=intro_body,
                          author=parry)
            senses.posted_time = datetime.datetime(2018, 12, 27)

            with open(filepath+'identification.html','r') as f:
                intro_body = f.read()
            identification = Posts(id=102,
                          title="Sensing the world, No Senses Required... jk!",
                          subtitle="How do we know speech is speech?",
                          body=intro_body,
                          author=parry)
            identification.posted_time = datetime.datetime(2019, 1, 13)

            with open(filepath+'universalization.html','r') as f:
                intro_body = f.read()
            universalization = Posts(id=103,
                          title="Be Formless, Shapeless like wa.. no, no, no.. like Senses",
                          subtitle="How is a sense perceived as a sense?",
                          body=intro_body,
                          author=parry)
            universalization.posted_time = datetime.datetime(2019, 1, 28)

            with open(filepath+'languages.html','r') as f:
                intro_body = f.read()
            languages = Posts(id=104,
                          title="I AM a Language (:",
                          subtitle="What does it mean to know a language?",
                          body=intro_body,
                          author=lalita)
            languages.posted_time = datetime.datetime(2019, 2, 23)

            with open(filepath+'consciousness.html','r') as f:
                intro_body = f.read()
            consciousness = Posts(id=105,
                          title="Yeh 'consciousness' kya hai?",
                          subtitle="What is this consciousness idea that we gravitate to?",
                          body=intro_body,
                          author=nick)
            consciousness.posted_time = datetime.datetime(2019, 10, 16)

            processing = Posts(id=997,
                          title="Parry's Processing",
                          subtitle="Crash into the world of inputs, outputs and foreign object analysis",
                          body=parry_summary,
                          author=parry)
            processing.posted_time = datetime.datetime(2018, 5, 20)
            language = Posts(id=998,
                          title="Lalita's Language",
                          subtitle="Take a deep breath and navigate the subtle realm of transformations",
                          body=lalita_summary,
                          author=lalita)
            language.posted_time = datetime.datetime(2018, 5, 20)
            natural = Posts(id=999,
                          title="Nick's Natural Core",
                          subtitle="Step back, look inward and appreciate the harmony of the universe",
                          body=nick_summary,
                          author=nick)
            natural.posted_time = datetime.datetime(2018, 5, 20)

            db.session.add(intro)
            db.session.add(senses)
            db.session.add(identification)
            db.session.add(universalization)
            db.session.add(languages)
            db.session.add(consciousness)
            db.session.add(processing)
            db.session.add(language)
            db.session.add(natural)
            db.session.commit()
            print("INIT: posts commited to db", file=sys.stderr)

        Posts.reindex()
        print("INIT: posts indexed in elastic", file=sys.stderr)
