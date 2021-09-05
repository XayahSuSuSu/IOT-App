from flask import Blueprint

import util.db as _db

iot = Blueprint('iot', __name__)


@iot.route("/")
def hello_world():
    return "Server is running..."


@iot.route('/api/v1/all')
def all():
    data = _db.get_all()
    res = {
        'code': 1,
        'data': [],
    }
    for i in data:
        res['data'].append({
            'index': i[0],
            'temp': i[4],
            'humi': i[5],
            'lum': i[6],
        })
    return res
