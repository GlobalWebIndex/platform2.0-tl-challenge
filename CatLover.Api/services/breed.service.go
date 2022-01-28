package services

import (
	// "database/sql"
	// _ "github.com/mattn/go-sqlite3"

	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"catlover.api/models"
)

type BreedService interface {
	GetAllBreeds() []models.Breed
	GetOneBreed(id string) (models.Breed, int32)
	OpenBreedJsonFile() []models.Breed
}

func GetAllBreeds() []models.Breed {

	//If SQLite was working
	// db, err := sql.Open("sqlite3", "../data/catlover.db")
	// breeds, err := db.Query("SELECT * FROM Breed")
	// if err != nil {
	// 	panic(err)
	// }
	// breeds.Close()

	var breeds = OpenBreedJsonFile()
	return breeds
}

func GetOneBreed(id string) (models.Breed, int32) {

	//If SQLite was working
	// db, err := sql.Open("sqlite3", "../data/catlover.db")
	// breeds, err := db.Query("SELECT * FROM Breed WHERE Id = " + id)
	// if err != nil {
	// 	panic(err)
	// }
	// breeds.Close()

	var breeds = OpenBreedJsonFile()
	for index := range breeds {
		if breeds[index].Id == id {
			return breeds[index], 1
		}
	}
	var breed = models.Breed{}
	return breed, 0
}

func OpenBreedJsonFile() []models.Breed {
	jsonFile, err := os.Open("data/breeds.json")
	if err != nil {
		log.Fatalf("failed opening file: %s", err)
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened breeds.json")

	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var breeds []models.Breed
	json.Unmarshal(byteValue, &breeds)
	return breeds
}
