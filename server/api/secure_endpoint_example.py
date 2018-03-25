from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from server import db, app
from server.utils.auth import requires_auth

secure_endpoint_example_blueprint = Blueprint('secure_endpoint', __name__)


class SecureEndpointExampleAPI(MethodView):

    @requires_auth
    def get(self):
        return jsonify({'foo': 'bar'})

# define the API resources
secure_endpoint_view = SecureEndpointExampleAPI.as_view('secure_endpoint_example_api')

# add Rules for API Endpoints
secure_endpoint_example_blueprint.add_url_rule(
    '/secure_endpoint/',
    view_func=secure_endpoint_view,
    methods=['GET']
)