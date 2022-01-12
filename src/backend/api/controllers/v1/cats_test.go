package v1_test

import (
	"encoding/json"
	"go-gwi/api/contracts"
	v1 "go-gwi/api/controllers/v1"
	mock_services "go-gwi/mocks/services"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

var _ = Describe("Cats", func() {
	var catsController v1.CatsController
	var mockCatsService *mock_services.MockCatsService
	var mockTokenService *mock_services.MockTokenService

	BeforeEach(func() {
		os.Setenv("DEFAULT_PAGE_SIZE", "10")

		ctrl := gomock.NewController(GinkgoT())
		defer ctrl.Finish()
		mockCatsService = mock_services.NewMockCatsService(ctrl)
		mockTokenService = mock_services.NewMockTokenService(ctrl)
		catsController = v1.NewCatsController(mockCatsService, mockTokenService)
	})
	Describe("Get", func() {
		It("Get cats without breed_id", func() {
			// Arrange
			cats := []contracts.Cat{
				{Id: 1, Title: "cat1", ImageUrl: "url1", BreedId: 1, Breed: contracts.Breed{Id: 1, Title: "breed1"}},
				{Id: 2, Title: "cat2", ImageUrl: "url2", BreedId: 2, Breed: contracts.Breed{Id: 2, Title: "breed2"}},
			}
			mockCatsService.EXPECT().GetCats(gomock.Any(), gomock.Any()).Return(cats, nil)
			req := httptest.NewRequest(http.MethodGet, "/cats", nil)
			req.Header.Set("Content-Type", "application/json")
			req.URL.RawQuery = "page=1&pageSize=15"
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Request = req

			// Act
			catsController.Get(c)
			res := w.Result()
			defer res.Body.Close()
			out, err := ioutil.ReadAll(res.Body)
			var replyCats []contracts.Cat
			err = json.Unmarshal(out, &replyCats)
			if err != nil {
				panic(err)
			}

			// Assert
			Expect(res.StatusCode).To(Equal(http.StatusOK))
			Expect(len(replyCats)).To(Equal(len(cats)))
			Expect(replyCats[0].Id).To(Equal(cats[0].Id))
			Expect(replyCats[0].Title).To(Equal(cats[0].Title))
			Expect(replyCats[0].ImageUrl).To(Equal(cats[0].ImageUrl))
			Expect(replyCats[0].Breed.Id).To(Equal(cats[0].Breed.Id))
			Expect(replyCats[0].Breed.Title).To(Equal(cats[0].Breed.Title))
		})
		It("Get cats with breed_id", func() {
			// Arrange
			cats := []contracts.Cat{
				{Id: 1, Title: "cat1", ImageUrl: "url1", BreedId: 1, Breed: contracts.Breed{Id: 1, Title: "breed1"}},
			}
			mockCatsService.EXPECT().GetCatsByBreedId(gomock.Any(), gomock.Any(), gomock.Any()).Return(cats, nil)
			req := httptest.NewRequest(http.MethodGet, "/cats", nil)
			req.Header.Set("Content-Type", "application/json")
			req.URL.RawQuery = "page=1&pageSize=15&breed_id=1"
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Request = req

			// Act
			catsController.Get(c)
			res := w.Result()
			defer res.Body.Close()
			out, err := ioutil.ReadAll(res.Body)
			var replyCats []contracts.Cat
			err = json.Unmarshal(out, &replyCats)
			if err != nil {
				panic(err)
			}

			// Assert
			Expect(res.StatusCode).To(Equal(http.StatusOK))
			Expect(len(replyCats)).To(Equal(len(cats)))
			Expect(replyCats[0].Id).To(Equal(cats[0].Id))
			Expect(replyCats[0].Title).To(Equal(cats[0].Title))
			Expect(replyCats[0].ImageUrl).To(Equal(cats[0].ImageUrl))
			Expect(replyCats[0].Breed.Id).To(Equal(cats[0].Breed.Id))
			Expect(replyCats[0].Breed.Title).To(Equal(cats[0].Breed.Title))
		})
	})
	Describe("Get Random Cats", func() {
		It("Get random cats without breed_id", func() {
			// Arrange
			cats := []contracts.Cat{
				{Id: 1, Title: "cat1", ImageUrl: "url1", BreedId: 1, Breed: contracts.Breed{Id: 1, Title: "breed1"}},
				{Id: 2, Title: "cat2", ImageUrl: "url2", BreedId: 2, Breed: contracts.Breed{Id: 2, Title: "breed2"}},
			}
			mockCatsService.EXPECT().GetRandomCats().Return(cats, nil)
			req := httptest.NewRequest(http.MethodGet, "/cats/random", nil)
			req.Header.Set("Content-Type", "application/json")
			req.URL.RawQuery = "page=1&pageSize=15"
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Request = req

			// Act
			catsController.GetRandom(c)
			res := w.Result()
			defer res.Body.Close()
			out, err := ioutil.ReadAll(res.Body)
			var replyCats []contracts.Cat
			err = json.Unmarshal(out, &replyCats)
			if err != nil {
				panic(err)
			}

			// Assert
			Expect(res.StatusCode).To(Equal(http.StatusOK))
			Expect(len(replyCats)).To(Equal(len(cats)))
			Expect(replyCats[0].Id).To(Equal(cats[0].Id))
			Expect(replyCats[0].Title).To(Equal(cats[0].Title))
			Expect(replyCats[0].ImageUrl).To(Equal(cats[0].ImageUrl))
			Expect(replyCats[0].Breed.Id).To(Equal(cats[0].Breed.Id))
			Expect(replyCats[0].Breed.Title).To(Equal(cats[0].Breed.Title))
		})
	})
})
