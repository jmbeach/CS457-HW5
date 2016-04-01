package main

import (
	"github.com/ricallinson/forgery"
	"database/sql"
	"github.com/elgs/gosqljson"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
)

func getEvents(db *sql.DB,req *f.Request,res *f.Response, next func()) {
	caseStyle := "original"
	headers ,data, _ := gosqljson.QueryDbToArray(db,caseStyle,"SELECT * FROM AlarmEvent order by eventdate desc")
	fmt.Println(headers)
	res.Send(data);
}

func getNotifications(db *sql.DB,req *f.Request,res *f.Response, next func()) {
	caseStyle := "original"
	headers ,data, _ := gosqljson.QueryDbToArray(db,caseStyle,"SELECT * FROM AlarmNotification order by notificationid desc")
	fmt.Println(headers)
	res.Send(data);
}

func main() {
	app := f.CreateServer()
	db, err := sql.Open("sqlite3","./Alarms.sqlite")
	checkErr(err);
	app.Use(f.Static());
	app.Use(f.Static(map[string]string{"root": "./public"}))
	app.Use(f.Static(map[string]string{"root/bower_components": "./bower_components"}))
	app.Get("(/[a-zA-Z(%20)]*)+",func(req *f.Request,res *f.Response, next func()) {
		fmt.Println(req.Url)
		switch(req.Url) {
			case "events":
				getEvents(db,req,res,next);
				break;
			case "notifications":
				getNotifications(db,req,res,next);
				break;
			default:
				fmt.Println("sending home page indirectly")
				res.Sendfile("./public/index.html");
				break;
		}
	})
	app.Listen(3000);
}

func checkErr(err error) {
    if err != nil {
        panic(err)
    }
}
