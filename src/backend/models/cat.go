package models

type Cat struct {
	Id       int `gorm:"primary_key"`
	Title    string
	ImageUrl string
	BreedId  int
	Breed    Breed
}
