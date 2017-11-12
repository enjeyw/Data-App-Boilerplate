from flask import Blueprint
from flask_restful import Api, Resource, abort, reqparse

from server import db, app
from server.models import User, OAuthProfile
from server.utils.auth import get_auth0_profile, generate_token, verify_token

auth_api = Api(Blueprint('auth_api', __name__))

@auth_api.resource('/auth/refresh_api_token/')
class Refresh_API_Token(Resource):


    def post(self):
        try:
            args = self.reqparse.parse_args()
            old_api_token = args.get('ApiToken')
            user = verify_token(old_api_token)

            if user:
                token = generate_token(user)
                return {'token': token}
            else:
                return {'token': None}

        except:
            return {'token': None}

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('ApiToken', location = 'json')
        super().__init__()


@auth_api.resource('/auth/request_api_token/')
class Request_API_Token(Resource):

    def post(self):

        try:
            args = self.reqparse.parse_args()
            auth0_profile = get_auth0_profile(args['auth0AccessToken'])
            profile_type, profile_id = auth0_profile['sub'].split('|')
            email = auth0_profile.get('email')
        except:
            abort(401)

        stored_profile = OAuthProfile.query.filter_by(profile_type = profile_type, profile_id = profile_id).first()

        if stored_profile:
            user = stored_profile.user
            token = generate_token(user)
        else:

            user = None

            if app.config['MERGE_OAUTH_PROFILES'] and auth0_profile.get('email_verified'):
                user = User.query.filter_by(email = email).first()

            if not user:
                user = User(email = email)
                db.session.add(user)

            stored_profile = OAuthProfile(profile_type = profile_type, profile_id = profile_id)
            stored_profile.user = user
            db.session.add(stored_profile)

            db.session.commit()

            token = generate_token(user)

        return {'token': token}

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('auth0AccessToken', type = str, required = True, location = 'json')
        super().__init__()

