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
            _db.delete_useless('books')
            _db.sort('books')
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


@iot.route('/api/v1/books', methods=['GET', 'POST', 'PUT'])
def books():
    try:
        if request.method == 'POST':
            # rfid=xxx&name=&place=
            form = request.form.to_dict()
            list_data = [form['rfid'], form['name'], form['place'], '', '']
            _db.delete_useless('books')
            _db.sort('books')
            _db.insert('books', list_data)
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
        elif request.method == 'PUT':
            # rfid=xxx&userid_now=&userid_history=
            form = request.form.to_dict()
            _db.delete_useless('books')
            _db.sort('books')
            _db.delete_useless('users')
            _db.sort('users')
            _db.update('books', form['rfid'], form['userid_now'], form['userid_history'])

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


@iot.route('/api/v1/users/check', methods=['GET', 'POST'])
def users_check():
    try:
        if request.method == 'POST':
            # rfid=xxx
            form = request.form.to_dict()
            list_data = ['', form['rfid']]
            _db.delete_useless('users')
            _db.sort('users')
            _db.insert('users', list_data)
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


@iot.route('/api/v1/users', methods=['GET', 'POST'])
def users():
    try:
        if request.method == 'POST':
            # rfid=xxx&name=
            form = request.form.to_dict()
            list_data = [form['name'], form['rfid']]
            _db.delete_useless('users')
            _db.sort('users')
            _db.insert('users', list_data)
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
        elif request.method == 'GET':
            users = _db.get_all('users')
            res = {
                'code': 1,
                'data': [],
            }
            for i in range(len(users)):
                users[i]['created_at'] = users[i]['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                users[i]['updated_at'] = users[i]['updated_at'].strftime("%Y-%m-%d %H:%M:%S")
            res['data'] = users
            return res
    except KeyError:
        return {
            'code': -1,
            'message': '参数错误',
        }


@iot.route('/api/v1/rfid', methods=['GET', 'POST'])
def rfid():
    try:
        if request.method == 'POST':
            # rfid=xxx
            form = request.form.to_dict()
            users = _db.get_all('users')
            books = _db.get_all('books')
            type = 'none'
            for i in range(len(users)):
                if form['rfid'] == users[i]['userid']:
                    type = 'users'

            for i in range(len(books)):
                if form['rfid'] == books[i]['rfid']:
                    type = 'books'

            if type == 'users':
                list_data = ['', form['rfid']]
                _db.delete_useless('users')
                _db.sort('users')
                _db.insert('users', list_data)
            elif type == 'books':
                list_data = [form['rfid'], '', '', '', '']
                _db.delete_useless('books')
                _db.sort('books')
                _db.insert('books', list_data)
            else:
                list_data = ['', form['rfid']]
                _db.delete_useless('users')
                _db.sort('users')
                _db.insert('users', list_data)

                list_data = [form['rfid'], '', '', '', '']
                _db.delete_useless('books')
                _db.sort('books')
                _db.insert('books', list_data)

            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
        elif request.method == 'GET':
            args = request.args.to_dict()
            users = _db.get_all('users')
            books = _db.get_all('books')
            res = {
                'code': 1,
                'data': [],
            }
            res['data'] = 'none'
            for i in range(len(users)):
                if args['rfid'] == users[i]['userid']:
                    res['data'] = 'users'
            for i in range(len(books)):
                if args['rfid'] == books[i]['rfid']:
                    res['data'] = 'books'
            return res
    except KeyError:
        return {
            'code': -1,
            'message': '参数错误',
        }


@iot.route('/api/v1/enters', methods=['GET', 'POST'])
def enters():
    try:
        if request.method == 'POST':
            list_data = []
            _db.insert('enters', list_data)
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': []
            }
    except KeyError:
        return {
            'code': -1,
            'message': '参数错误',
        }
