import os
import configparser

parser = configparser.ConfigParser()

basedir = os.path.abspath(os.path.dirname(__file__))

location = os.environ.get('LOCATION')

if location == "PROD":
    parser.read(os.path.join(basedir,'config_files/prod_config.ini'))
elif location == "LOCAL_DOCKER":
    parser.read(os.path.join(basedir,'config_files/local_docker_config.ini'))
else:
    parser.read(os.path.join(basedir,'config_files/local_config.ini'))

SECRET_KEY = parser['APP']['SECRET_KEY']

SQLALCHEMY_DATABASE_URI = 'postgresql://%(user)s:%(password)s@%(host)s:%(port)s/%(database)s' % parser['DATABASE']

SQLALCHEMY_TRACK_MODIFICATIONS = False

REDIS_URL = parser['REDIS']['URI']

MERGE_OAUTH_PROFILES = True
AUTH0_DOMAIN = parser['AUTH0']['domain']
AUTH0_CLIENT_ID = parser['AUTH0']['client_id']
AUTH0_CLIENT_SECRET = parser['AUTH0']['client_secret']


TOKEN_EXPIRATION =  60 * 60 * 24 * 7 # 1 Week
