package utils

import (
	"fmt"
	"os"
	"strings"

	"github.com/withmandala/go-log"
)

const titleCharNum = 67
const titleChar = "-"

var Logger = log.New(os.Stderr)

func ShowLogAppTitle() {
	fmt.Println(strings.Repeat(titleChar, titleCharNum))
	fmt.Println(`
	CoffeeManager API by @akrck02																		
	`)
	fmt.Println(strings.Repeat(titleChar, titleCharNum))
}

func Log(msg string) {
	Logger.Info(msg)
}

func Error(msg string) {
	Logger.Error(msg)
}

func Jump() {
	Log("")
}
