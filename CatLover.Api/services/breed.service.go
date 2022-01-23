package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"catlover.api/models"
)

func GetAllBreeds() []models.Breed {
	var breeds = OpenBreedJsonFile()
	return breeds
}

func GetOneBreed(id string) (models.Breed, int32) {
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
