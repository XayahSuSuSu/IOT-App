package main

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"net/http"
)

var r *gin.Engine
var db *gorm.DB

const (
	JsonSuccess int = 1
	JsonError   int = 0
)

type IOTHistory struct {
	gorm.Model
	Temp int
	Humi float32
	Lum  int
}

func main() {
	dbInit()     // 初始化gorm
	serverInit() // 初始化gin
}

func serverInit() {
	r = gin.Default()
	r.GET("/")
	v1 := r.Group("/api/v1/iotapp")
	{
		v1.POST("/add", add)
		v1.GET("/get", get)
	}
	err := r.Run()
	if err != nil {
		panic("failed to run server")
	}
} // 初始化gin

func dbInit() {
	dsn := "root":123456@tcp(127.0.0.1:3306)/iotapp?charset=utf8mb4&parseTime=True&loc=Local"
	var err error
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// 自动迁移模式
	err = db.AutoMigrate(&IOTHistory{})
	if err != nil {
		panic("failed to auto migrate")
	}
} // 初始化gorm

func get(c *gin.Context) {
	var his []IOTHistory
	db.Find(&his)
	c.JSON(http.StatusOK, gin.H{
		"status":  JsonSuccess,
		"message": &his,
	})
} // 获取所有记录

func add(c *gin.Context) {
	db.Create(&IOTHistory{
		Temp: 20,
		Humi: 0.8,
		Lum:  400,
	})
	c.JSON(http.StatusOK, gin.H{
		"status":  JsonSuccess,
		"message": "创建成功",
	})
} // 添加一条记录
