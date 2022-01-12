package helpers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func BadRequest(c *gin.Context) {
	c.Status(http.StatusBadRequest)
	c.Abort()
}

func Unauthorized(c *gin.Context) {
	c.Status(http.StatusUnauthorized)
	c.Abort()
}

func InternalServerError(c *gin.Context) {
	c.Status(http.StatusInternalServerError)
	c.Abort()
}

func OK(c *gin.Context, obj interface{}) {
	c.JSON(http.StatusOK, obj)
}

func EmptyOK(c *gin.Context) {
	c.Status(http.StatusOK)
}
