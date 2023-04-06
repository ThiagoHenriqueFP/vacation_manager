import psycopg2
import pandas as pd

connectionData = {
    "host": "localhost",
    "database": "vac_mng",
    "user": "postgres",
    "password": "postgres"
}


def connect(connectionData):
    conn = None
    try:
        conn = psycopg2.connect(**connectionData)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    return conn


def postgresql_to_dataframe(conn, select_query, column_names):
    cursor = conn.cursor()
    try:
        cursor.execute(select_query)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cursor.close()
        return 1

    tupples = cursor.fetchall()
    cursor.close

    df = pd.DataFrame(tupples, columns=column_names)
    return df


conn = connect(connectionData)

# column_names = ["id", "team_id", "employee_id", "date_start",
#                 "date_end", "status", "reason", "thirteenth"]


# df = postgresql_to_dataframe(conn, 'SELECT * FROM "Vacation"', column_names)

# print(df)
