import psycopg2
import time
import sys


def postgres(db_name, user, host, password):
    conn = None
    conn_str = ("dbname='%s' user='%s' host='%s' password='%s'"
                " connect_timeout=1") % (db_name, user, host, password)
    while (not conn):
        print("POSTGRES: waiting for db..", file=sys.stderr)

        time.sleep(1)
        try:
            conn = psycopg2.connect(conn_str)
        except psycopg2.OperationalError:
            pass
    conn.close()


def elastics(es):
    while not es.ping():
        print("ELASTICSEARCH: waiting for server..", file=sys.stderr)
        time.sleep(1)


# if __name__ == "__main__":
#
#     from elasticsearch import Elasticsearch
#     postgres(os.getenv('POSTGRES_DB'),
#              os.getenv('POSTGRES_USER'),
#              os.getenv('POSTGRES_HOST'),
#              os.getenv('POSTGRES_PASS'))
#     print("DB up", file=sys.stdout)
#     elastics(Elasticsearch([os.getenv('ELASTIC_URL')], verify_certs=True))
#     print("ES up", file=sys.stdout)
