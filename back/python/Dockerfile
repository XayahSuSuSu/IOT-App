FROM python:3

WORKDIR /home/iotapp

RUN ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' > /etc/timezone

COPY ./requirements.txt /home/iotapp/requirements.txt

RUN pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/

COPY . /home/iotapp

CMD ["gunicorn", "-k", "gevent", "-b", "0.0.0.0:3307", "main:app"]
