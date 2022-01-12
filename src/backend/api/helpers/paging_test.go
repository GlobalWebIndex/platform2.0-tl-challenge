package helpers_test

import (
	"net/http"
	"net/http/httptest"
	"os"

	"github.com/gin-gonic/gin"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"go-gwi/api/helpers"
)

var _ = Describe("Paging", func() {
	BeforeEach(func() {
		os.Setenv("DEFAULT_PAGE_SIZE", "20")
	})
	Describe("ParsePagingParams", func() {
		It("captures page and limit params", func() {
			c, _ := gin.CreateTestContext(httptest.NewRecorder())
			c.Request, _ = http.NewRequest("GET", "https://example.com/foo?page=1&pageSize=12", nil)

			page, pageSize, err := helpers.ParsePagingParams(c)
			Expect(err).To(BeNil())
			Expect(page).To(Equal(1))
			Expect(pageSize).To(Equal(12))
		})
		It("captures only page and initializes pageSize from env value", func() {
			c, _ := gin.CreateTestContext(httptest.NewRecorder())
			c.Request, _ = http.NewRequest("GET", "https://example.com/foo?page=1", nil)

			page, pageSize, err := helpers.ParsePagingParams(c)
			Expect(err).To(BeNil())
			Expect(page).To(Equal(1))
			Expect(pageSize).To(Equal(20))
		})
	})
})
