package main

import (
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
	handleRequests()
}
