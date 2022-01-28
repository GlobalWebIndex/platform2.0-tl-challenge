package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"catlover.api/models"
	"catlover.api/services"

	"github.com/gin-gonic/gin"
)

// GET /cats (Get all cats)
func GetAllCats(c *gin.Context) {
	var cats = services.GetAllCats()
	fmt.Println("Endpoint Hit: GetAllCats")
	var response = services.ReturnResponse("OK", 200, "Below you can find "+strconv.Itoa(len(cats))+" cats. Click on a image to open cat details.", cats)
	c.IndentedJSON(http.StatusOK, response)
}

// GET /catsfavorites (Get all favorite cats)
func GetAllCatsFavorites(c *gin.Context) {
	var catsFavorites = services.GetCatFavorites()
	fmt.Println("Endpoint Hit: GetAllCatsBreeds")
	var response = services.ReturnResponse("OK", 200, "Below you can find "+strconv.Itoa(len(catsFavorites))+" favorite cats. Click 'Remove' button to remove the selected cat from your favorites.", catsFavorites)
	c.IndentedJSON(http.StatusOK, response)
}

// GET /cats/id (Get one cat)
func GetCatById(c *gin.Context) {
	fmt.Println("Endpoint Hit: GetCatById")
	var id = c.Param("id")
	cat, count := services.GetCatById(id)
	if count == 0 {
		var response = services.ReturnResponse("404 Not Found", 404, "The can with the id "+id+" was not found", nil)
		c.IndentedJSON(http.StatusNotFound, response)
		return
	}
	var response = services.ReturnResponse("OK", 200, "Below you can find the cat with id: "+id, cat)
	c.IndentedJSON(http.StatusOK, response)
}

// GET /catsbreed/id (Get cats of a breed id)
func GetCatsByBreedId(c *gin.Context) {
	fmt.Println("Endpoint Hit: GetCatsByBreedId")
	var breedId = c.Param("id")
	cats := services.GetCatsByBreedId(breedId)
	var response = services.ReturnResponse("OK", 200, "Below you can find "+strconv.Itoa(len(cats))+" cats.", cats)
	c.IndentedJSON(http.StatusOK, response)
}

// PATCH /cats/id (Update one cat)
func UpdateCat(c *gin.Context) {
	var cat models.Cat
	var catId = c.Param("id")
	cat, count := services.UpdateCat(catId, c)
	if count == 0 {
		var response = services.ReturnResponse("404 Not Found", 404, "The can with the id "+catId+" was not found", nil)
		c.IndentedJSON(http.StatusNotFound, response)
		return
	}
	var response = services.ReturnResponse("OK", 200, "The cat with the id "+catId+" was updated successfully", cat)
	c.IndentedJSON(http.StatusOK, response)
}
