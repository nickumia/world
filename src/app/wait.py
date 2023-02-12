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


# if __name__ == "__main__":
#
#     postgres(os.getenv('POSTGRES_DB'),
#              os.getenv('POSTGRES_USER'),
#              os.getenv('POSTGRES_HOST'),
#              os.getenv('POSTGRES_PASS'))
#     print("DB up", file=sys.stdout)
