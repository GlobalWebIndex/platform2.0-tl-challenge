package models

type Breed struct {
	Id       int `gorm:"primary_key"`
	Title    string
	ImageUrl string
	Details  string
}
