package services_test

import (
	"errors"

	"github.com/golang/mock/gomock"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	mock_repositories "go-gwi/mocks/repositories"
	mock_services "go-gwi/mocks/services"
	"go-gwi/models"
	"go-gwi/services"
)

var _ = Describe("Users", func() {
	var usersService services.UserService
	var mockFavouritesRepository *mock_repositories.MockFavouritesRepository
	var mockTokenService *mock_services.MockTokenService
	var mockUserRepository *mock_repositories.MockUserRepository

	BeforeEach(func() {
		var err error

		ctrl := gomock.NewController(GinkgoT())
		defer ctrl.Finish()
		mockTokenService = mock_services.NewMockTokenService(ctrl)
		mockUserRepository = mock_repositories.NewMockUserRepository(ctrl)
		mockFavouritesRepository = mock_repositories.NewMockFavouritesRepository(ctrl)

		usersService = services.NewUserService(mockUserRepository, mockFavouritesRepository, mockTokenService)
		Expect(err).To(BeNil())
	})

	Describe("Login", func() {
		It("returns token-id with correct credentials", func() {
			jwtToken := "jwt-token"
			tokenId := "fake-tokenId"
			mockUserRepository.EXPECT().GetByEmailPassword("email", gomock.Any()).Return(&models.User{}, nil)
			mockTokenService.EXPECT().Generate(gomock.Any()).Return(jwtToken, nil)
			mockTokenService.EXPECT().Cache(jwtToken).Return(tokenId, nil)

			favourites, err := usersService.Login("email", "password")

			Expect(err).To(BeNil())
			Expect(favourites).To(Equal(tokenId))
		})

		It("returns err with wrong credentials", func() {
			jwtToken := "jwt-token"
			tokenId := "fake-tokenId"
			mockUserRepository.EXPECT().GetByEmailPassword("email", gomock.Any()).Return(nil, errors.New("Not found"))
			mockTokenService.EXPECT().Generate(gomock.Any()).Return(jwtToken, nil)
			mockTokenService.EXPECT().Cache(jwtToken).Return(tokenId, nil)

			result, err := usersService.Login("email", "password")

			Expect(err).NotTo(BeNil())
			Expect(result).To(BeEmpty())
		})

		It("returns err while could not generate token", func() {
			tokenId := "fake-tokenId"
			mockUserRepository.EXPECT().GetByEmailPassword("email", gomock.Any()).Return(&models.User{}, nil)
			mockTokenService.EXPECT().Generate(gomock.Any()).Return("", errors.New("Cannot generate token"))
			mockTokenService.EXPECT().Cache(gomock.Any()).Return(tokenId, nil)

			result, err := usersService.Login("email", "password")

			Expect(err).NotTo(BeNil())
			Expect(result).To(BeEmpty())
		})

		It("returns err while could not cache token", func() {
			jwtToken := "jwt-token"
			mockUserRepository.EXPECT().GetByEmailPassword("email", gomock.Any()).Return(&models.User{}, nil)
			mockTokenService.EXPECT().Generate(gomock.Any()).Return(jwtToken, nil)
			mockTokenService.EXPECT().Cache(jwtToken).Return("", errors.New("Cannot cache token"))

			result, err := usersService.Login("email", "password")

			Expect(err).NotTo(BeNil())
			Expect(result).To(BeEmpty())
		})

		Describe("GetFavourites", func() {
			It("returns a single favourite", func() {
				// Arrange
				mockFavourites := []models.Favourite{
					{Id: 1, UserId: 1, CatId: 1},
				}
				userId := 1
				mockFavouritesRepository.
					EXPECT().
					GetByUserId(userId).Return(mockFavourites, nil)

				// Act
				favourites, err := usersService.GetFavourites(userId)

				// Assert
				Expect(err).To(BeNil())
				Expect(len(favourites)).To(Equal(1))
				Expect(favourites[0].CatId).To(Equal(1))
				Expect(favourites[0].UserId).To(Equal(1))
			})
		})
	})
})
