package v1

import (
	"go-gwi/api/contracts"
	api "go-gwi/api/helpers"
	"go-gwi/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

type UsersController interface {
	Register(c *gin.Context)
	Login(c *gin.Context)
	Logout(c *gin.Context)
	GetFavourites(c *gin.Context)
	CreateFavourite(c *gin.Context)
	DeleteFavourite(c *gin.Context)
}

type usersController struct {
	userService  services.UserService
	tokenService services.TokenService
}

func NewUsersController(userService services.UserService, tokenService services.TokenService) UsersController {
	return &usersController{userService: userService, tokenService: tokenService}
}

func (uc *usersController) Register(c *gin.Context) {
	var user contracts.User
	err := c.BindJSON(&user)
	if err != nil {
		api.BadRequest(c)
		return
	}

	userId, err := uc.userService.Register(&user)
	if err != nil {
		api.InternalServerError(c)
		return
	}

	api.OK(c, gin.H{"userId": userId})
}

func (uc *usersController) Login(c *gin.Context) {
	var login contracts.Login
	err := c.BindJSON(&login)
	if err != nil {
		api.BadRequest(c)
		return
	}

	tokenId, err := uc.userService.Login(login.Email, login.Password)
	if err != nil {
		api.InternalServerError(c)
		return
	}

	api.OK(c, gin.H{"tokenId": tokenId})
}

func (uc *usersController) Logout(c *gin.Context) {
	tokenId := c.GetHeader("token-id")

	err := uc.tokenService.Revoke(tokenId)
	if err != nil {
		api.InternalServerError(c)
		return
	}

	api.EmptyOK(c)
}

func (uc *usersController) GetFavourites(c *gin.Context) {
	tokenId := c.GetHeader("token-id")
	userId, err := uc.tokenService.GetUserId(tokenId)

	favourites, err := uc.userService.GetFavourites(userId)
	if err != nil {
		api.InternalServerError(c)
		return
	}

	api.OK(c, favourites)
}

func (uc *usersController) CreateFavourite(c *gin.Context) {
	var cat contracts.Cat
	err := c.BindJSON(&cat)
	result, err := uc.userService.CreateFavourite(cat)
	if !result || err != nil {
		api.InternalServerError(c)
		return
	}

	api.OK(c, result)
}

func (uc *usersController) DeleteFavourite(c *gin.Context) {
	favouriteIdParam := c.Param("id")
	if len(favouriteIdParam) == 0 {
		api.BadRequest(c)
		return
	}

	favouriteId, err := strconv.Atoi(favouriteIdParam)
	if err != nil {
		api.BadRequest(c)
		return
	}

	result, err := uc.userService.DeleteFavourite(favouriteId)
	if !result || err != nil {
		api.InternalServerError(c)
		return
	}

	api.OK(c, result)
}
