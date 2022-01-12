package helpers_test

import (
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"go-gwi/api/contracts"
	"go-gwi/helpers"
	"go-gwi/models"
)

var _ = Describe("Convert", func() {
	Describe("ConvertCats", func() {
		It("converts cat models to cat contracts", func() {
			cats := []contracts.Cat{}
			catModels := []models.Cat{
				{Id: 1, Title: "Foo", ImageUrl: "https://example.com/foo.jpg", BreedId: 1},
				{Id: 2, Title: "Bar", ImageUrl: "https://example.com/bar.jpg", BreedId: 2},
			}

			helpers.ConvertCats(&cats, catModels)
			Expect(cats).To(HaveLen(2))
			Expect(cats[0].Id).To(Equal(catModels[0].Id))
			Expect(cats[0].Title).To(Equal(catModels[0].Title))
			Expect(cats[0].ImageUrl).To(Equal(catModels[0].ImageUrl))
			Expect(cats[0].BreedId).To(Equal(catModels[0].BreedId))
		})
	})
	Describe("ConvertBreeds", func() {
		It("converts breed models to breed contracts", func() {
			breeds := []contracts.Breed{}
			breedModels := []models.Breed{
				{Id: 1, Title: "Foo"},
				{Id: 2, Title: "Bar"},
			}

			helpers.ConvertBreeds(&breeds, breedModels)
			Expect(breeds).To(HaveLen(2))
			Expect(breeds[0].Id).To(Equal(breedModels[0].Id))
			Expect(breeds[0].Title).To(Equal(breedModels[0].Title))
		})
	})
	Describe("ConvertBreed", func() {
		It("converts breed model to breed contract", func() {
			breedContract := contracts.Breed{}
			breedModel := models.Breed{Id: 1, Title: "Foo"}

			helpers.ConvertBreed(&breedContract, breedModel)
			Expect(breedContract.Id).To(Equal(breedModel.Id))
			Expect(breedContract.Title).To(Equal(breedModel.Title))
		})
	})
	Describe("ConvertFavourites", func() {
		It("converts favourite models to favourite contracts", func() {
			favourites := []contracts.Favourite{}
			favouriteModels := []models.Favourite{
				{Id: 1, UserId: 1, CatId: 1},
				{Id: 2, UserId: 1, CatId: 2},
			}

			helpers.ConvertFavourites(&favourites, favouriteModels)
			Expect(favourites).To(HaveLen(2))
			Expect(favourites[0].Id).To(Equal(favouriteModels[0].Id))
			Expect(favourites[0].UserId).To(Equal(favouriteModels[0].UserId))
			Expect(favourites[0].CatId).To(Equal(favouriteModels[0].CatId))
		})
	})
	Describe("ConvertUser", func() {
		It("converts user model to user contract", func() {
			userContract := contracts.User{}
			userModel := models.User{Id: 1, Email: "giannis@gmail.com", Password: "password"}

			helpers.ConvertUser(&userContract, &userModel)
			Expect(userContract.Id).To(Equal(userModel.Id))
			Expect(userContract.FirstName).To(Equal(userModel.FirstName))
			Expect(userContract.LastName).To(Equal(userModel.LastName))
			Expect(userContract.Email).To(Equal(userModel.Email))
			Expect(userContract.Password).To(Equal(userModel.Password))
		})
	})
})
