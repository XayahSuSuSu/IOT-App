import pymysql

HOST = 'db'  # 宿主机地址
USER = 'root'  # 用户名
PASSWORD = '123456'  # 密码
DB = 'iotapp'  # 数据库名
TABLE = 'data'  # 数据表名


def get_all():
    """返回表中所有数据"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute("use {};".format(DB))
    cursor.execute("SELECT * from {}".format(TABLE))
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
        "lum float);".format(TABLE))
    db.close()


def insert(temp, humi, lum):
    """插入一条记录"""
    db = pymysql.connect(host=HOST, user=USER, password=PASSWORD, charset='utf8')
    cursor = db.cursor()
    cursor.execute("use {};".format(DB))
    cursor.execute("INSERT INTO data VALUES (0,{},{},{})".format(temp, humi, lum))
    db.commit()
    db.close()
