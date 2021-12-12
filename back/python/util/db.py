import datetime

import pymysql

HOST = 'db'  # 宿主机地址
USER = 'root'  # 用户名
PASSWORD = '123456'  # 密码
DB = 'iotapp'  # 数据库名

TABLE_VID = 'VID'
TABLE_PID = 'PID'

TABLE_Tin = 'Tin'
TABLE_Tout = 'Tout'
TABLE_LXin = 'LXin'

FIELD_VID = [
    "VID text",
]

FIELD_PID = [
    "VID text,",
    "PID text",
]

FIELD_Tin = [
    "VID text,",
    "Tin text",
]

FIELD_Tout = [
    "VID text,",
    "Tout text",
]

FIELD_LXin = [
    "VID text,",
    "LXin text",
]

TABLE_DATA = 'data'
FIELD_DATA = [
    "VID text,",
    "Tin text,",
    "Tout text,",
    "LXin text",
]

TABLE_BOX = 'box'

FIELD_BOX = [
    "VID text,",
    "TinDH text,",
    "TinDL text,",
    "TG text,",
    "LXD text,",
    "TBegin text,",
    "TEnd text,",
    "VStatus text",
]

TABLE_CONTROL = 'control'

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

    # 创建数据表(VID)
    field_vid = "".join(FIELD_VID)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_VID)
        + "created_at timestamp,updated_at timestamp,"
        + field_vid
        + ");")
    # 创建数据表(PID)
    field_pid = "".join(FIELD_PID)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_PID)
        + "created_at timestamp,updated_at timestamp,"
        + field_pid
        + ");")

    # 创建数据表(DATA)
    field_data = "".join(FIELD_DATA)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_DATA)
        + "created_at timestamp,updated_at timestamp,"
        + field_data
        + ");")

    # 创建数据表(Tin)
    field_tin = "".join(FIELD_Tin)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_Tin)
        + "created_at timestamp,updated_at timestamp,"
        + field_tin
        + ");")
    # 创建数据表(Tout)
    field_tout = "".join(FIELD_Tout)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_Tout)
        + "created_at timestamp,updated_at timestamp,"
        + field_tout
        + ");")
    # 创建数据表(LXin)
    field_lxin = "".join(FIELD_LXin)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_LXin)
        + "created_at timestamp,updated_at timestamp,"
        + field_lxin
        + ");")

    # 创建数据表(BOX)
    field_box = "".join(FIELD_BOX)
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS {}(id int primary key not null auto_increment,".format(TABLE_BOX)
        + "created_at timestamp,updated_at timestamp,"
        + field_box
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
    insert_data = "INSERT INTO {} VALUES (0,'{}','{}'".format(table, timestamp(), timestamp())
    for i in data:
        insert_data += ",'"
        insert_data += i
        insert_data += "'"
    insert_data += ")"
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
