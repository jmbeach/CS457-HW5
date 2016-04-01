all: go bower

go:
	go build web.go
bower:
	bower install
