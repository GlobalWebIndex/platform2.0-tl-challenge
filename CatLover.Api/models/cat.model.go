package models

type Cat struct {
	Id         string `json:"id"`
	Breed      string `json:"breed"`
	Details    string `json:"details"`
	PhotoUrl   string `json:"photoUrl"`
	IsFavorite bool   `json:"isFavorite"`
}
