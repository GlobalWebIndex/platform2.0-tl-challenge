package helpers

import (
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ParsePagingParams(c *gin.Context) (int, int, error) {
	pageParam := c.Query("page")
	pageSizeParam := c.Query("pageSize")

	if len(pageParam) == 0 {
		pageParam = "1"
	}

	page, err := strconv.Atoi(pageParam)
	if err != nil {
		return 0, 0, err
	}

	if len(pageSizeParam) == 0 {
		pageSizeParam = os.Getenv("DEFAULT_PAGE_SIZE")
	}

	pageSize, err := strconv.Atoi(pageSizeParam)
	if err != nil {
		return 0, 0, err
	}

	return page, pageSize, nil
}
