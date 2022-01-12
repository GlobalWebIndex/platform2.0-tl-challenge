package models

type User struct {
	Id        int `gorm:"primary_key;autoIncrement"`
	Email     string
	FirstName string
	LastName  string
	Password  string
}
