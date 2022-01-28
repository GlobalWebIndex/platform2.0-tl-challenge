package main

import (
	// "database/sql"
	// _ "github.com/mattn/go-sqlite3"

	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"catlover.api/controllers"
	"catlover.api/services"
)

func homePage(c *gin.Context) {
	fmt.Println("Endpoint Hit: pageNotFound")
	var response = services.ReturnResponse("404 Not Found", 404, "pageNotFound!", nil)
	c.IndentedJSON(http.StatusOK, response)
}

func handleRequests() {

	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/", homePage)

	//Cats route
	router.GET("/cats", controllers.GetAllCats)
	router.GET("/catsfavorites", controllers.GetAllCatsFavorites)
	router.GET("/cats/:id", controllers.GetCatById)
	router.GET("/catsbreed/:id", controllers.GetCatsByBreedId)
	router.PATCH("/cats/:id", controllers.UpdateCat)

	//Breeds route
	router.GET("/breeds", controllers.GetAllBreeds)
	router.GET("/breeds/:id", controllers.GetBreedById)

	router.NoRoute(func(c *gin.Context) {
		c.IndentedJSON(http.StatusNotFound, services.ReturnResponse("404 Not Found", 404, "Page not found.", nil))
	})

	router.Run("localhost:10000")
}

func main() {

	//go-sqlite3 is not working
	//I always get the error "cgo: C compiler "gcc" not found: exec: "gcc": executable file not found in %PATH%" when im trying to install the package go-sqlite3. "go install github.com/mattn/go-sqlite3" & "go get github.com/mattn/go-sqlite3"
	//MiniGW & tdm64-gcc are installed. every solution i found from web, is not working.
	// db, err := sql.Open("sqlite3", "./data/catlover.db")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer db.Close()

	handleRequests()
}
