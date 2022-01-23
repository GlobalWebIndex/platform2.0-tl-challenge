package models

type Cat struct {
	Id         string `json:"id"`
	BreedId    string `json:"breedId"`
	PhotoUrl   string `json:"photoUrl"`
	IsFavorite bool   `json:"isFavorite"`
}
