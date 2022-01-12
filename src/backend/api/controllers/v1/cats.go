package v1

import (
	"fmt"
	api "go-gwi/api/helpers"
	"go-gwi/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CatsController interface {
	Get(c *gin.Context)
	GetRandom(c *gin.Context)
}

type catsController struct {
	catsService  services.CatsService
	tokenService services.TokenService
}

func NewCatsController(catsService services.CatsService, tokenService services.TokenService) CatsController {
	return &catsController{catsService: catsService, tokenService: tokenService}
}

func (ctrl *catsController) Get(c *gin.Context) {
	page, pageSize, err := api.ParsePagingParams(c)
	if err != nil {
		api.BadRequest(c)
		return
	}

	breedIdQueryParam := c.Query("breed_id")
	fmt.Printf("breedIdQueryParam: %s\n", breedIdQueryParam)
	if len(breedIdQueryParam) > 0 {
		breedId, err := strconv.Atoi(breedIdQueryParam)
		if err == nil {
			cats, err := ctrl.catsService.GetCatsByBreedId(breedId, page, pageSize)
			if err != nil {
				api.InternalServerError(c)
				return
			}

			api.OK(c, cats)
			return
		}

	}

	cats, err := ctrl.catsService.GetCats(page, pageSize)
	if err != nil {
		api.InternalServerError(c)
		return
	}

	api.OK(c, cats)
}

func (ctrl *catsController) GetRandom(c *gin.Context) {
	cats, err := ctrl.catsService.GetRandomCats()
	if err != nil {
		api.InternalServerError(c)
		return
	}

	api.OK(c, cats)
}
