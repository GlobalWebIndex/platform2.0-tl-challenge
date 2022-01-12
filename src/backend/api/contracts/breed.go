package contracts

type Breed struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	ImageUrl string `json:"imageUrl"`
	Details  string `json:"details"`
}
