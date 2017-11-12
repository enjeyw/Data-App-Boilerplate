#!flask/bin/python
import os

os.environ["LOCATION"] = "LOCAL"

from server import app

app.run(debug=True, threaded=True, port=5000)