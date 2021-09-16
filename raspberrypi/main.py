import time
import requests


def polling():
    res = requests.post('http://192.168.119.124:3307/api/v2/polling')
    print(res.text)


def polling_timer():
    while True:
        print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()), '/api/v2/polling')
        polling()
        time.sleep(2)


polling_timer()
