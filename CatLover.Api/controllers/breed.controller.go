package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"catlover.api/services"

	"github.com/gin-gonic/gin"
)

// GET /breeds (Get all Breeds)
func GetAllBreeds(c *gin.Context) {
	var breeds = services.GetAllBreeds()
	fmt.Println("Endpoint Hit: GetAllBreeds")
	var response = services.ReturnResponse("OK", 200, "Below you can find "+strconv.Itoa(len(breeds))+" breeds.", breeds)
	c.IndentedJSON(http.StatusOK, response)
}

// GET /breeds/id (Get one Breed)
func GetBreedById(c *gin.Context) {
	fmt.Println("Endpoint Hit: GetBreedById")
	var id = c.Param("id")
	breed, count := services.GetOneBreed(id)
	if count == 0 {
		var response = services.ReturnResponse("404 Not Found", 404, "The breed with the id "+id+" was not found", nil)
		c.IndentedJSON(http.StatusNotFound, response)
		return
	}
	var response = services.ReturnResponse("OK", 200, "Below you can find the breed with id: "+id, breed)
	c.IndentedJSON(http.StatusOK, response)
}
