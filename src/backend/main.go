package main

import (
	"fmt"
	"go-gwi/app"

	"github.com/joho/godotenv"
)

func main() {
	// Environment variables setup
	e := godotenv.Load()
	if e != nil {
		fmt.Print(e)
	}

	// Api setup
	r := app.ApiInit()

	r.Run()
}
