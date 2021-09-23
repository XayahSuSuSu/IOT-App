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
            _db.insert('data', {
                'temp': form['temp'],
                'humi': form['humi'],
                'lum': form['lum']
            })
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
                for i in data:
                    res['data'].append({
                        'id': i['id'],
                        'temp': i['temp'],
                        'humi': i['humi'],
                        'lum': i['lum'],
                    })
            if args['get'] == 'latest':
                # /api/v1/data?get=latest
                if len(data) == 0:
                    res['data'] = '没有数据'
                else:
                    res['data'] = {
                        'id': data[len(data) - 1]['id'],
                        'temp': data[len(data) - 1]['temp'],
                        'humi': data[len(data) - 1]['humi'],
                        'lum': data[len(data) - 1]['lum'],
                    }
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
            # obj=fan&action=1
            form = request.form.to_dict()
            print(form)
            _db.insert('control', {
                'obj': form['obj'],
                'action': form['action'],
            })
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
                for i in data:
                    res['data'].append({
                        'id': i['id'],
                        'obj': i['obj'],
                        'action': i['action'],
                        'state': i['state'],
                    })
            if args['get'] == 'todo':
                # /api/v1/control?get=todo
                for i in data:
                    if i['state'] == 0:
                        res['data'].append({
                            'id': i['id'],
                            'obj': i['obj'],
                            'action': i['action'],
                            'state': i['state'],
                        })
            if args['get'] == 'finished':
                # /api/v1/control?get=finished
                for i in data:
                    if i['state'] == 1:
                        res['data'].append({
                            'id': i['id'],
                            'obj': i['obj'],
                            'action': i['action'],
                            'state': i['state'],
                        })
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
                _db.insert('data', {
                    'temp': form['temp'],
                    'humi': form['humi'],
                    'lum': form['lum']
                })
            res = {
                'code': 1,
                'data': [],
            }
            data = _db.get_all('control')
            for i in data:
                if i['state'] == 0:
                    res['data'].append({
                        'id': i['id'],
                        'obj': i['obj'],
                        'action': i['action'],
                        'state': i['state'],
                    })
            return res
    except KeyError:
        print(KeyError)
        return {
            'code': -1,
            'message': '参数错误',
        }
