import os
import configparser

parser = configparser.ConfigParser()

basedir = os.path.abspath(os.path.dirname(__file__))

location = os.environ.get('LOCATION')

if location == "PROD":
    parser.read(os.path.join(basedir,'config_files/prod_config.ini'))
else:
    parser.read(os.path.join(basedir,'config_files/local_config.ini'))

SECRET_KEY = parser['APP']['SECRET_KEY']

SQLALCHEMY_DATABASE_URI = 'postgresql://%(user)s:%(password)s@%(host)s:%(port)s/%(database)s' % parser['DATABASE']

SQLALCHEMY_TRACK_MODIFICATIONS = False

REDIS_URL = parser['REDIS']['URI']

MERGE_OAUTH_PROFILES = True
TOKEN_EXPIRATION =  60 * 60 * 24 * 7 # 1 Week
