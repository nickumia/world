from datetime import datetime
from app import db
from app.search.models import SearchableMixin
from sqlalchemy.dialects.mysql import MEDIUMTEXT

class Posts(SearchableMixin, db.Model):
    __searchable__ = ['title', 'body']

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140))
    subtitle = db.Column(db.String(255))
    body = db.Column(MEDIUMTEXT)
    posted_time = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return '<Post {}>'.format(self.body)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'subtitle': self.subtitle,
            'body': self.body,
            'posted_time': str(self.posted_time),
            'author': self.user_id
        }
