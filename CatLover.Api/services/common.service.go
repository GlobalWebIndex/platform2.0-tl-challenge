package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"catlover.api/models"
)

func ReturnResponse(status string, code int32, message string, data interface{}) models.Response {
	var response = models.Response{
		Status:  status,
		Code:    code,
		Message: message,
		Data:    data,
	}
	return response
}

func GetAllData() []models.Cat {
	var cats = OpenJsonFile()
	return cats
}

func GetOneData(id string) (models.Cat, int32) {
	var cats = OpenJsonFile()
	for index := range cats {
		if cats[index].Id == id {
			return cats[index], 1
		}
	}
	var cat = models.Cat{}
	return cat, 0
}

func OpenJsonFile() []models.Cat {
	jsonFile, err := os.Open("cats.json")
	if err != nil {
		log.Fatalf("failed opening file: %s", err)
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened cats.json")

	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var cats []models.Cat
	json.Unmarshal(byteValue, &cats)
	return cats
}

func UpdateJsonFile(id string, cat models.Cat) {
	jsonFile, errorOpenFile := os.OpenFile("cats.json", os.O_RDWR, 0755)

	if errorOpenFile != nil {
		log.Fatalf("failed opening file: %s", errorOpenFile)
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var cats []models.Cat
	json.Unmarshal(byteValue, &cats)

	for index := range cats {
		if cats[index].Id == id {
			cats[index].Breed = cat.Breed
			cats[index].Details = cat.Details
			cats[index].PhotoUrl = cat.PhotoUrl
			cats[index].IsFavorite = cat.IsFavorite
		}
	}

	catsJson, errorCatsJson := json.Marshal(cats)
	if errorCatsJson != nil {
		log.Fatalf("failed writing to file: %s", errorCatsJson)
	}

	var errorTruncate = jsonFile.Truncate(0)
	_, errorTruncate = jsonFile.Seek(0, 0)
	if errorTruncate != nil {
		log.Fatalf("failed writing to file: %s", errorTruncate)
	}

	len, errorWriteString := jsonFile.WriteString(string(catsJson))
	if errorWriteString != nil {
		log.Fatalf("failed writing to file: %s", errorWriteString)
	}
	fmt.Printf("\nLength: %d bytes", len)
	fmt.Printf("\nFile Name: %s", jsonFile.Name())
}
