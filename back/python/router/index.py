from flask import Blueprint, request

import util.db as _db

iot = Blueprint('iot', __name__)


@iot.route("/")
def hello_world():
    _db.init()
    return "Server is running..."


@iot.route('/api/v1/data', methods=['GET', 'POST'])
def data():
    try:
        if request.method == 'POST':
            # temp=20&humi=0.8&lum=400
            form = request.form.to_dict()
            list_data = list(form.values())
            _db.insert('data', list_data)
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
        else:
            args = request.args.to_dict()
            data = _db.get_all('data')
            print(data)
            res = {
                'code': 1,
                'data': [],
            }
            if args['get'] == 'all':
                # /api/v1/data?get=all
                for i in range(len(data)):
                    data[i]['created_at'] = data[i]['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                    data[i]['updated_at'] = data[i]['updated_at'].strftime("%Y-%m-%d %H:%M:%S")
                res['data'] = data
            if args['get'] == 'latest':
                # /api/v1/data?get=latest
                if len(data) == 0:
                    res['data'] = '没有数据'
                else:
                    last_index = len(data) - 1
                    data[last_index]['created_at'] = data[last_index]['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                    data[last_index]['updated_at'] = data[last_index]['updated_at'].strftime("%Y-%m-%d %H:%M:%S")
                    res['data'] = data[last_index]
            return res
    except KeyError:
        return {
            'code': -1,
            'message': '参数错误',
        }


@iot.route('/api/v1/control', methods=['GET', 'POST'])
def control():
    try:
        if request.method == 'POST':
            # protocol=xxx
            form = request.form.to_dict()
            list_data = list(form.values())
            _db.insert('control', list_data)
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
        else:
            args = request.args.to_dict()
            data = _db.get_all('control')
            print(data)
            res = {
                'code': 1,
                'data': [],
            }
            if args['get'] == 'all':
                # /api/v1/control?get=all
                for i in range(len(data)):
                    data[i]['created_at'] = data[i]['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                    data[i]['updated_at'] = data[i]['updated_at'].strftime("%Y-%m-%d %H:%M:%S")
                res['data'] = data
            if args['get'] == 'todo':
                # /api/v1/control?get=todo
                for i in range(len(data)):
                    if data[i]['finished'] == 0:
                        data[i]['created_at'] = data[i]['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                        data[i]['updated_at'] = data[i]['updated_at'].strftime("%Y-%m-%d %H:%M:%S")
                        res['data'].append(data[i])
            if args['get'] == 'finished':
                # /api/v1/control?get=finished
                for i in range(len(data)):
                    if data[i]['finished'] == 1:
                        data[i]['created_at'] = data[i]['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                        data[i]['updated_at'] = data[i]['updated_at'].strftime("%Y-%m-%d %H:%M:%S")
                        res['data'].append(data[i])
            return res
    except KeyError:
        return {
            'code': -1,
            'message': '参数错误',
        }


@iot.route('/api/v1/control/finish', methods=['POST'])
def finish():
    try:
        if request.method == 'POST':
            # id=1
            form = request.form.to_dict()
            print(form)
            _db.update('control', form['id'])
            return {
                'code': 1,
                'message': '成功更新一条数据',
                'data': form
            }
    except KeyError:
        return {
            'code': -1,
            'message': '参数错误',
        }


@iot.route('/api/v2/polling', methods=['POST'])
def polling():
    try:
        if request.method == 'POST':
            # null or temp=20&humi=0.8&lum=400
            form = request.form.to_dict()
            if form != {}:
                list_data = list(form.values())
                _db.insert('data', list_data)
            res = {
                'code': 1,
                'data': [],
            }
            data = _db.get_all('control')
            for i in range(len(data)):
                if data[i]['finished'] == 0:
                    data[i]['created_at'] = data[i]['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                    data[i]['updated_at'] = data[i]['updated_at'].strftime("%Y-%m-%d %H:%M:%S")
                    res['data'].append(data[i])
            return res
    except KeyError:
        print(KeyError)
        return {
            'code': -1,
            'message': '参数错误',
        }
