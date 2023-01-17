package data

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func GetConnection(file string) *sql.DB {

	if db != nil {
		return db
	}

	var err error
	db, err = sql.Open("sqlite3", file)
	if err != nil {
		panic(err)
	}

	var version string
	err = db.QueryRow("SELECT SQLITE_VERSION()").Scan(&version)

	if err != nil {
		panic(err)
	}

	fmt.Println(version)

	return db
}
