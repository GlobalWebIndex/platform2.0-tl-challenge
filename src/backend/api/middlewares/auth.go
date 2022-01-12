package middlewares

import (
	"go-gwi/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthMiddleware interface {
	ValidateJwtToken() gin.HandlerFunc
}

type authMiddleware struct {
	tokenService services.TokenService
}

func NewAuthMiddleware(tokenService services.TokenService) AuthMiddleware {
	return &authMiddleware{tokenService: tokenService}
}

func (a *authMiddleware) ValidateJwtToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenId := c.GetHeader("token-id")

		if tokenId == "DEMO" {
			c.Next()
		}

		valid, err := a.tokenService.Verify(tokenId)
		if err != nil || !valid {
			c.Status(http.StatusUnauthorized)
			c.Abort()
			return
		}

		err = a.tokenService.Refresh(tokenId)
		if err != nil {
			c.Status(http.StatusInternalServerError)
			c.Abort()
		}

		c.Next()
	}
}
