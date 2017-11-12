from flask import Blueprint
from flask_restful import Api, Resource, abort, reqparse

from server import db, app
from server.utils.auth import AuthenticatedResource

secure_endpoint_api = Api(Blueprint('secure_endpoint_api', __name__))

@secure_endpoint_api.resource('/secure_endpoint/')
class Refresh_API_Token(AuthenticatedResource):

    def get(self):
        return {'foo': 'bar'}

