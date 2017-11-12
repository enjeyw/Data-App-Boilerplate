from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from rq import Queue
from rq.job import Job
# from server import worker

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

from .api.auth import auth_api
from .api.secure_endpoint_example import secure_endpoint_api
from .views.index import index_view

app.register_blueprint(auth_api.blueprint, url_prefix='/api')
app.register_blueprint(secure_endpoint_api.blueprint, url_prefix='/api')

app.register_blueprint(index_view)

# q = Queue(connection=worker.conn)

