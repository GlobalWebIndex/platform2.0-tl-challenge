package contracts

type Cat struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	ImageUrl string `json:"imageUrl"`
	BreedId  int    `json:"-"`
	Breed    Breed  `json:"breed"`
}
