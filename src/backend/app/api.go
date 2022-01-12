package app

import (
	controllersV1 "go-gwi/api/controllers/v1"
	"go-gwi/api/middlewares"
	"go-gwi/repositories"
	"go-gwi/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func ApiInit() *gin.Engine {

	// Database setup
	db := DbInit()
	cache := CacheInit()

	// Initialize Repositories
	userRepository := repositories.NewUserRepository(*db)
	catsRepository := repositories.NewCatsRepository(*db)
	breedsRepository := repositories.NewBreedsRepository(*db)
	favouritesRepository := repositories.NewFavouritesRepository(*db)

	// Initialize Services
	tokenService := services.NewTokenService(cache)
	userService := services.NewUserService(userRepository, favouritesRepository, tokenService)
	catsService := services.NewCatsService(catsRepository, breedsRepository)

	// Initialize Middlewares
	authMiddleware := middlewares.NewAuthMiddleware(tokenService)

	// Initialize Controllers
	userV1Controller := controllersV1.NewUsersController(userService, tokenService)
	versionV1Controller := controllersV1.NewVersionController()
	catsV1Controller := controllersV1.NewCatsController(catsService, tokenService)
	breedsV1Controller := controllersV1.NewBreedsController(catsService)

	r := gin.Default()

	// Setup CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"http://localhost:8888", "http://localhost:3000"},
		AllowMethods:  []string{"GET", "PUT", "POST", "DELETE"},
		AllowHeaders:  []string{"*"},
		ExposeHeaders: []string{"Content-Length"},
	}))

	// Public endpoints
	v1 := r.Group("/api/v1")
	{
		v1.GET("/version", versionV1Controller.Get)
		v1.POST("/user", userV1Controller.Register)
		v1.POST("/user/token", userV1Controller.Login)
	}

	// Authorized endpoints
	v1.Use(authMiddleware.ValidateJwtToken())
	{
		v1.DELETE("/user/token", userV1Controller.Logout)
		v1.POST("/user/favourites", userV1Controller.CreateFavourite)
		v1.GET("/user/favourites", userV1Controller.GetFavourites)
		v1.DELETE("/user/favourites/:id", userV1Controller.DeleteFavourite)
		v1.GET("/cats", catsV1Controller.Get)
		v1.GET("/cats/random", catsV1Controller.GetRandom)
		v1.GET("/breeds", breedsV1Controller.Get)
		v1.GET("/breeds/:id", breedsV1Controller.GetBreed)
	}

	return r
}
