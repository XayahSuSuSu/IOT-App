from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app, supports_credentials=True)

from router.index import iot

app.register_blueprint(iot, url_prefix="/")

if __name__ == '__main__':
    app.run()
