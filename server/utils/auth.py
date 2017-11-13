from functools import wraps
from flask import request, g
import requests
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from server import app, models

from flask_restful import Resource, abort


def get_auth0_profile(auth_0_identity_token):

    headers = {'content-type': 'application/json',
               'authorization': 'Bearer ' + auth_0_identity_token}

    r = requests.get(app.config['AUTH0_DOMAIN'], headers = headers)

    try:
        profile = r.json()
    except:
        raise

    return profile

def generate_token(user, expiration=app.config['TOKEN_EXPIRATION']):
    s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
    token = s.dumps({
        'id': user.id
    }).decode('utf-8')
    return token

def verify_token(token):
    s = Serializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None
    user = models.User.query.get(data['id'])
    return user

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token:
            string_token = token.encode('ascii', 'ignore')
            user = verify_token(string_token)
            if user:
                g.current_user = user
                return f(*args, **kwargs)

        return abort(401, message="Authentication is required to access this resource")

    return decorated


class AuthenticatedResource(Resource):
    method_decorators = [requires_auth]
