from flask import Flask

app = Flask(__name__)

from router.index import iot

app.register_blueprint(iot, url_prefix="/")

if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run()
