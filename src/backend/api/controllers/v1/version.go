package v1

import (
	api "go-gwi/api/helpers"
	"os"

	"github.com/gin-gonic/gin"
)

type VersionController interface {
	Get(ctx *gin.Context)
}

type versionController struct{}

func NewVersionController() VersionController {
	return &versionController{}
}

func (c *versionController) Get(ctx *gin.Context) {
	apiVersion := os.Getenv("API_VERSION")
	version := map[string]string{
		"version": apiVersion,
	}
	api.OK(ctx, version)
}
