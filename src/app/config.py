import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SERVER_NAME = os.getenv('SERVER_NAME', 'localhost:8000')
    SECRET_KEY = os.getenv('SECRET_KEY', 'have-fun')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL',
                                        'postgresql://postgres:pass@db/'
                                        'postgres')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ELASTICSEARCH_URL = os.environ.get('ELASTICSEARCH_URL',
                                       'http://localhost:9200')
    RESULTS_PER_PAGE = 10
    ENCRYPTION_KEY = os.getenv('ENCRYPTION_KEY',
                               'IS4KazwEAVpe4nMagfV54pxnuL9ufzsAsvQyjozvgTw=')
