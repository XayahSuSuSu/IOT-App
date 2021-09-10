import pymysql

HOST = 'db'  # 宿主机地址
USER = 'root'  # 用户名
PASSWORD = '123456'  # 密码
DB = 'iotapp'  # 数据库名
TABLE_DATA = 'data'  # 数据表名
TABLE_CONTROL = 'control'  # 数据表名


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
    # 创建数据表
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,"
        "temp float,"
        "humi float,"
        "lum float);".format(TABLE_DATA))
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,"
        "obj text,"
        "action tinyint,"
        "state tinyint);".format(TABLE_CONTROL))
    db.close()


def insert(table, data):
    """插入一条记录"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor()
    cursor.execute("use {};".format(DB))
    if table == TABLE_DATA:
        cursor.execute("INSERT INTO {} VALUES (0,{},{},{})".format(table, data['temp'], data['humi'], data['lum']))
    elif table == TABLE_CONTROL:
        cursor.execute("INSERT INTO {} VALUES (0,'{}',{},{})".format(table, data['obj'], data['action'], 0))
    db.commit()
    db.close()


def update(table, id):
    """插入一条记录"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor()
    cursor.execute("use {};".format(DB))
    cursor.execute("update {} set state = {} where id = {}".format(table, 1, id))
    db.commit()
    db.close()
