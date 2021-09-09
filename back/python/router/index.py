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
            _db.insert(form['temp'], form['humi'], form['lum'])
            return {
                'code': 1,
                'message': '成功插入一条数据',
                'data': form
            }
        else:
            args = request.args.to_dict()
            data = _db.get_all()
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
