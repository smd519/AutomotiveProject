import psycopg2
from psycopg2 import OperationalError

def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname='cs6400_fall23_team060',
            user='postgres',
            password='mysecret',
            host='db'
        )
        return conn
    except OperationalError as e:
        print(f"An error occurred: {e}")
        return None