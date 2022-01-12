package helpers

import (
	"go-gwi/api/contracts"
	"go-gwi/models"
)

func ConvertCats(cats *[]contracts.Cat, catModels []models.Cat) {
	for _, cat := range catModels {
		catContract := contracts.Cat{}
		ConvertCat(&catContract, cat)
		*cats = append(*cats, catContract)
	}
}

func ConvertBreeds(breeds *[]contracts.Breed, breedModels []models.Breed) {
	for _, breed := range breedModels {
		breedContract := contracts.Breed{}
		ConvertBreed(&breedContract, breed)
		*breeds = append(*breeds, breedContract)
	}
}

func ConvertBreed(breedContract *contracts.Breed, breedModel models.Breed) {
	breedContract.Id = breedModel.Id
	breedContract.Title = breedModel.Title
	breedContract.ImageUrl = breedModel.ImageUrl
	breedContract.Details = breedModel.Details
}

func ConvertCat(catContract *contracts.Cat, catModel models.Cat) {
	catContract.Id = catModel.Id
	catContract.Title = catModel.Title
	catContract.ImageUrl = catModel.ImageUrl
	catContract.BreedId = catModel.BreedId
	catContract.Breed.Id = catModel.Breed.Id
	catContract.Breed.Title = catModel.Breed.Title
	catContract.Breed.ImageUrl = catModel.Breed.ImageUrl
	catContract.Breed.Details = catModel.Breed.Details
}

func ConvertFavourites(favourites *[]contracts.Favourite, favouriteModels []models.Favourite) {
	for _, favourite := range favouriteModels {
		favouriteContract := contracts.Favourite{}
		favouriteContract.Id = favourite.Id
		favouriteContract.UserId = favourite.UserId
		favouriteContract.CatId = favourite.CatId
		ConvertCat(&favouriteContract.Cat, favourite.Cat)
		*favourites = append(*favourites, favouriteContract)
	}
}

func ConvertUser(user *contracts.User, userModel *models.User) {
	userModel.Id = user.Id
	userModel.FirstName = user.FirstName
	userModel.LastName = user.LastName
	userModel.Email = user.Email
	userModel.Password = user.Password
}
