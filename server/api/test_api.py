from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from server import db, app
from server.utils.auth import requires_auth

test_api_blueprint = Blueprint('test', __name__)


class TestAPI(MethodView):

    def get(self):
        return jsonify({'foo': 'bar'})


# add Rules for API Endpoints
test_api_blueprint.add_url_rule(
    '/test',
    view_func=TestAPI.as_view('test'),
    methods=['GET']
)