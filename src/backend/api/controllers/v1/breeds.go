package v1

import (
	api "go-gwi/api/helpers"
	"go-gwi/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BreedsController interface {
	Get(c *gin.Context)
	GetBreed(c *gin.Context)
}

type breedsController struct {
	catsService services.CatsService
}

func NewBreedsController(catsService services.CatsService) BreedsController {
	return &breedsController{catsService: catsService}
}

func (bc *breedsController) Get(c *gin.Context) {
	page, pageSize, err := api.ParsePagingParams(c)
	if err != nil {
		api.BadRequest(c)
		return
	}

	breeds, err := bc.catsService.GetBreeds(page, pageSize)
	if err != nil {
		api.InternalServerError(c)
		return
	}

	api.OK(c, breeds)
}

func (bc *breedsController) GetBreed(c *gin.Context) {
	breedIdParam := c.Param("id")
	if len(breedIdParam) == 0 {
		api.BadRequest(c)
		return
	}

	breedId, err := strconv.Atoi(breedIdParam)
	if err != nil {
		api.BadRequest(c)
		return
	}

	breed, err := bc.catsService.GetBreed(breedId)
	if err != nil {
		api.InternalServerError(c)
		return
	}

	api.OK(c, breed)
}
