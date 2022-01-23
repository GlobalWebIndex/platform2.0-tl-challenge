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
	var cats = services.GetAllData()
	fmt.Println("Endpoint Hit: GetAllCats")
	var response = services.ReturnResponse("OK", 200, "Below you can find "+strconv.Itoa(len(cats))+" cats.", cats)
	c.IndentedJSON(http.StatusOK, response)
}

// GET /cats/id (Get one cat)
func GetCatById(c *gin.Context) {
	fmt.Println("Endpoint Hit: GetCatById")
	var id = c.Param("id")
	cat, count := services.GetOneData(id)
	if count == 0 {
		var response = services.ReturnResponse("404 Not Found", 404, "The can with the id "+id+" was not found", nil)
		c.IndentedJSON(http.StatusNotFound, response)
		return
	}
	var response = services.ReturnResponse("OK", 200, "Below you can find the cat with id: "+id, cat)
	c.IndentedJSON(http.StatusOK, response)
}

// PATCH /cats/id (Update one cat)
func UpdateCat(c *gin.Context) {
	var cat models.Cat
	var id = c.Param("id")
	cat, count := services.GetOneData(id)
	if count == 0 {
		var response = services.ReturnResponse("404 Not Found", 404, "The can with the id "+id+" was not found", nil)
		c.IndentedJSON(http.StatusNotFound, response)
		return
	}

	var inputCat models.Cat
	if err := c.ShouldBindJSON(&inputCat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var updatedCat models.Cat
	updatedCat.Breed = inputCat.Breed
	updatedCat.Details = inputCat.Details
	updatedCat.PhotoUrl = inputCat.PhotoUrl
	updatedCat.IsFavorite = inputCat.IsFavorite

	services.UpdateJsonFile(id, updatedCat)

	var response = services.ReturnResponse("OK", 200, "The can with the id "+id+" was updated successfully", cat)
	c.IndentedJSON(http.StatusOK, response)
}
