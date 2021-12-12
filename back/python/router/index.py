from flask import Blueprint, request

import util.db as _db

iot = Blueprint('iot', __name__)


@iot.route("/")
def hello_world():
    _db.init()
    return "Server is running..."


@iot.route('/api/v1/box', methods=['GET', 'POST'])
def box():
    try:
        if request.method == 'POST':
            # VID=xxx&TinDH=&TinDL=&TG=&LXD=&TBegin=&TEnd=&VStatus=
            form = request.form.to_dict()
            list_data = [form['VID'], form['TinDH'], form['TinDL'], form['TG'], form['LXD'], form['TBegin'],
                         form['TEnd'], form['VStatus']]
            _db.insert('box', list_data)
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
        elif request.method == 'GET':
            box = _db.get_all('box')
            res = {
                'code': 1,
                'data': [],
            }
            for i in range(len(box)):
                box[i]['created_at'] = box[i]['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                box[i]['updated_at'] = box[i]['updated_at'].strftime("%Y-%m-%d %H:%M:%S")
            res['data'] = box
            return res
    except KeyError:
        return {
            'code': -1,
            'message': '参数错误',
        }


@iot.route('/api/v1/pid', methods=['GET', 'POST'])
def pid():
    try:
        if request.method == 'POST':
            # VID=xxx&PID=xxx
            form = request.form.to_dict()
            list_data = [form['VID'], form['PID']]
            pid = _db.get_all('PID')
            isExist = False
            for i in pid:
                if i['PID'] == form['PID']:
                    isExist = True
            if not isExist:
                _db.insert('PID', list_data)
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
        elif request.method == 'GET':
            data = _db.get_all('PID')
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


@iot.route('/api/v1/data', methods=['GET', 'POST'])
def data():
    try:
        if request.method == 'POST':
            # VID=xxx&Tin=xxx&Tout=xxx&LXin=xxx
            form = request.form.to_dict()
            list_data = [form['VID'], form['Tin'], form['Tout'], form['LXin']]
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


@iot.route('/api/v2/polling', methods=['POST'])
def polling():
    try:
        if request.method == 'POST':
            # null or VID=xxx&Tin=xxx&Tout=xxx&LXin=xxx
            form = request.form.to_dict()
            if form != {}:
                list_data = [form['VID'], form['Tin'], form['Tout'], form['LXin']]
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


@iot.route('/api/v1/control', methods=['GET', 'POST'])
def control():
    try:
        if request.method == 'POST':
            # protocol=xxx&state=xxx&finished=0
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
            # id=1&state=[1,2]
            form = request.form.to_dict()
            print(form)
            _db.update('control', form['id'], form['state'])
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
