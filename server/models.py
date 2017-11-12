from server import db
import datetime

class User(db.Model):
    __tablename__ = 'user'

    id              = db.Column(db.Integer, primary_key=True)
    created         = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    email           = db.Column(db.String())

    oauth_profiles  = db.relationship('OAuthProfile', backref='user', lazy='dynamic')

class OAuthProfile(db.Model):
    __tablename__ = 'oauth_profile'

    id              = db.Column(db.Integer, primary_key=True)
    created         = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    profile_type    = db.Column(db.String())
    profile_id      = db.Column(db.String())

    user_id         = db.Column(db.Integer, db.ForeignKey('user.id'))


