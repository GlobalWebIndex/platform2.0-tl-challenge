package models

type Favourite struct {
	Id     int `gorm:"primary_key"`
	CatId  int
	UserId int
	Cat    Cat
}
