import pymysql

HOST = 'localhost'
USER = 'root'
PASSWORD = '123456'
DB = 'iotapp'


def get_all():
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, db=DB)
    cursor = db.cursor()
    cursor.execute("SELECT * from iot_histories")
    data = cursor.fetchall()
    db.close()
    return data
