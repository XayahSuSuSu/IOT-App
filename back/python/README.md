# IOT-App后端搭建

> 平台：Docker + Flask + MySQL

## 一、安装Docker并配置好环境(略)

## 二、安装MySQL

1. 拉取 MySQL 镜像

```
docker pull mysql:latest
```

2. 运行 MySQL 容器

```
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

## 二、安装Flask

1. 制作 Flask 镜像

```
docker build -t 'flask' .  # 在后端源码根目录下运行
```

2. 运行 Flask 容器并连接 MySQL 容器

```
docker run -itd --name flask-test -p 3307:3307 --link mysql-test:db flask
```

## 三、访问后端页面

1. 浏览器打开 http://localhost:3307/

