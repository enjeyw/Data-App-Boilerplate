from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# from server import worker

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

from .views.index import index_view
from server.api.auth_api import auth_blueprint
from server.api.secure_endpoint_example import secure_endpoint_example_blueprint
from server.api.test_api import test_api_blueprint

app.register_blueprint(index_view)
app.register_blueprint(auth_blueprint, url_prefix='/api')
app.register_blueprint(secure_endpoint_example_blueprint, url_prefix='/api')
app.register_blueprint(test_api_blueprint, url_prefix='/api')

# q = Queue(connection=worker.conn)

