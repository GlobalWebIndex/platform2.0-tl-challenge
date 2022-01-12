package contracts

type Favourite struct {
	Id     int `json:"id"`
	UserId int `json:"userId"`
	CatId  int `json:"-"`
	Cat    Cat `json:"cat"`
}
