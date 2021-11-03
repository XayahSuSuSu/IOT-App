from flask import Blueprint, request

import util.db as _db

iot = Blueprint('iot', __name__)


@iot.route("/")
def hello_world():
    _db.init()
    return "Server is running..."


@iot.route('/api/v1/books/check', methods=['GET', 'POST'])
def books_check():
    try:
        if request.method == 'POST':
            # rfid=xxx
            form = request.form.to_dict()
            list_data = [form['rfid'], '', '', '', '']
            _db.delete_useless_books()
            _db.sort()
            _db.insert('books', list_data)
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
    except KeyError:
        return {
            'code': -1,
            'message': '参数错误',
        }


@iot.route('/api/v1/books', methods=['GET', 'POST'])
def books():
    try:
        if request.method == 'POST':
            # rfid=xxx&name=&place=&state=&userid=
            form = request.form.to_dict()
            list_data = [form['rfid'], form['name'], form['place'], form['state'], form['userid']]
            _db.delete_useless_books()
            _db.sort()
            _db.insert('books', list_data)
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
        elif request.method == 'GET':
            books = _db.get_all('books')
            res = {
                'code': 1,
                'data': [],
            }
            for i in range(len(books)):
                books[i]['created_at'] = books[i]['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                books[i]['updated_at'] = books[i]['updated_at'].strftime("%Y-%m-%d %H:%M:%S")
            res['data'] = books
            return res
    except KeyError:
        return {
            'code': -1,
            'message': '参数错误',
        }

@iot.route('/api/v1/data', methods=['GET', 'POST'])
def data():
    try:
        if request.method == 'POST':
            # smoke1=xxx&smoke2=xxx
            form = request.form.to_dict()
            list_data = [form['smoke1'], form['smoke2']]
            _db.insert('data', list_data)
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
        elif request.method == 'GET':
            data = _db.get_all('data')
            res = {
                'code': 1,
                'data': [],
            }
            for i in range(len(data)):
                data[i]['created_at'] = data[i]['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                data[i]['updated_at'] = data[i]['updated_at'].strftime("%Y-%m-%d %H:%M:%S")
            res['data'] = data
            return res
    except KeyError:
        return {
            'code': -1,
            'message': '参数错误',
        }
