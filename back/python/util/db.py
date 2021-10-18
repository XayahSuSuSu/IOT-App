import datetime

import pymysql

HOST = 'db'  # 宿主机地址
USER = 'root'  # 用户名
PASSWORD = '123456'  # 密码
DB = 'iotapp'  # 数据库名
TABLE_DATA = 'data'  # 数据表名
TABLE_CONTROL = 'control'  # 数据表名

FIELD_DATA = [
    "temp float,",
    "humi float,",
    "lum float"
]

FIELD_CONTROL = [
    "protocol text,",
    "state text,",
    "finished tinyint"
]


def timestamp():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def get_all(table):
    """返回表中所有数据"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute("use {};".format(DB))
    cursor.execute("SELECT * from {}".format(table))
    data = cursor.fetchall()
    db.close()
    return data


def init():
    """创建数据库和数据表"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor()
    # 创建数据库
    cursor.execute("CREATE DATABASE IF NOT EXISTS {} DEFAULT CHARSET utf8 COLLATE utf8_general_ci;".format(DB))
    # 选择数据库
    cursor.execute("use {};".format(DB))
    # 创建数据表(DATA)
    field_data = "".join(FIELD_DATA)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_DATA)
        + "created_at timestamp,updated_at timestamp,"
        + field_data
        + ");")
    # 创建数据表(CONTROL)
    field_control = "".join(FIELD_CONTROL)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_CONTROL)
        + "created_at timestamp,updated_at timestamp,"
        + field_control
        + ");")
    db.close()


def insert(table, data):
    """插入一条记录"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor()
    cursor.execute("use {};".format(DB))
    if table == TABLE_DATA:
        insert_data = "INSERT INTO {} VALUES (0,'{}','{}'".format(table, timestamp(), timestamp())
        for i in data:
            insert_data += ","
            insert_data += i
        insert_data += ")"
        cursor.execute(insert_data)
    elif table == TABLE_CONTROL:
        insert_data = "INSERT INTO {} VALUES (0,'{}','{}'".format(table, timestamp(), timestamp())
        for i in data:
            insert_data += ",'"
            insert_data += i
            insert_data += "'"
        insert_data += ",0)"
        cursor.execute(insert_data)
    db.commit()
    db.close()


def update(table, id, state):
    """更新一条记录"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor()
    cursor.execute("use {};".format(DB))
    cursor.execute(
        "update {} set finished = {},updated_at = '{}',state = '{}' where id = {}".format(table, 1, timestamp(), state,
                                                                                          id))
    db.commit()
    db.close()
