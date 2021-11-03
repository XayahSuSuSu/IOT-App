import datetime

import pymysql

HOST = 'db'  # 宿主机地址
USER = 'root'  # 用户名
PASSWORD = '123456'  # 密码
DB = 'iotapp'  # 数据库名
TABLE_DATA = 'data'  # 烟雾传感器数据表名
TABLE_BOOKS = 'books'  # 图书数据表名
TABLE_USERS = 'users'  # 用户数据表名
TABLE_ENTERS = 'enters'  # 进入信息数据表名

FIELD_DATA = [
    "smoke1 text,",
    "smoke2 text",
]

FIELD_BOOKS = [
    "rfid text,",
    "name text,",
    "place text,",
    "userid_now text,",
    "userid_history text",
]

FIELD_USERS = [
    "name text,",
    "userid text",
]

FIELD_ENTERS = [
    "userid text",
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
    # 创建数据表(BOOKS)
    field_books = "".join(FIELD_BOOKS)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_BOOKS)
        + "created_at timestamp,updated_at timestamp,"
        + field_books
        + ");")
    # 创建数据表(USERS)
    field_users = "".join(FIELD_USERS)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_USERS)
        + "created_at timestamp,updated_at timestamp,"
        + field_users
        + ");")
    # 创建数据表(ENTERS)
    field_enters = "".join(FIELD_ENTERS)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_ENTERS)
        + "created_at timestamp,updated_at timestamp,"
        + field_enters
        + ");")
    db.close()


def insert(table, data):
    """插入一条记录"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor()
    cursor.execute("use {};".format(DB))
    insert_data = "INSERT INTO {} VALUES (0,'{}','{}'".format(table, timestamp(), timestamp())
    for i in data:
        insert_data += ",'"
        insert_data += i
        insert_data += "'"
    insert_data += ")"
    cursor.execute(insert_data)
    db.commit()
    db.close()


def update(table, rfid, userid_now, userid_history):
    """更新一条记录"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor()
    cursor.execute("use {};".format(DB))
    cursor.execute(
        "update {} set userid_now = '{}',userid_history = '{}',updated_at = '{}' where rfid = {}".format(table,
                                                                                                     userid_now,
                                                                                                     userid_history,
                                                                                                     timestamp(),
                                                                                                     rfid))
    db.commit()
    db.close()


def delete_useless(table):
    """删除无用图书"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor()
    cursor.execute("use {};".format(DB))
    cursor.execute("delete from {} where name = '';".format(table))
    db.commit()
    db.close()


def sort(table):
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor()
    cursor.execute("use {};".format(DB))
    cursor.execute("ALTER TABLE `{}` DROP `id`;".format(table))
    cursor.execute("ALTER TABLE `{}` ADD `id` int NOT NULL FIRST;".format(table))
    cursor.execute("ALTER TABLE `{}` MODIFY COLUMN `id` int NOT NULL AUTO_INCREMENT,ADD PRIMARY KEY(id);".format(table))
    db.commit()
    db.close()
