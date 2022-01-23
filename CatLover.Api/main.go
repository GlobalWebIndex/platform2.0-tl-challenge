package main

import (
	"fmt"
	"net/http"

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
	router.GET("/", homePage)
	router.GET("/cats", controllers.GetAllCats)
	router.GET("/cats/:id", controllers.GetCatById)
	router.PATCH("/cats/:id", controllers.UpdateCat)
	router.NoRoute(func(c *gin.Context) {
		c.IndentedJSON(http.StatusNotFound, services.ReturnResponse("404 Not Found", 404, "Page not found.", nil))
	})
	router.Run("localhost:10000")
}

func main() {
	handleRequests()
}
