package services

import (
	// "database/sql"
	// _ "github.com/mattn/go-sqlite3"

	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"os"
	"time"

	"github.com/gin-gonic/gin"

	"catlover.api/models"
)

type CatService interface {
	GetAllCats() []models.Cat
	GetCatById(id string) (models.Cat, int32)
	GetCatsByBreedId(breedId string) []models.Cat
	GetCatFavorites() []models.Cat
	UpdateCat(id string, c *gin.Context) (models.Cat, int32)
}

func GetAllCats() []models.Cat {

	//If SQLite was working
	// db, err := sql.Open("sqlite3", "../data/catlover.db")
	// cats, err := db.Query("SELECT * FROM Cats")
	// if err != nil {
	// 	panic(err)
	// }
	// cats.Close()

	var cats = OpenJsonFile()
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(cats), func(i, j int) { cats[i], cats[j] = cats[j], cats[i] })
	return cats
}

func GetCatById(id string) (models.Cat, int32) {

	//If SQLite was working
	// db, err := sql.Open("sqlite3", "../data/catlover.db")
	// cats, err := db.Query("SELECT * FROM Cats WHERE Id = " + id)
	// if err != nil {
	// 	panic(err)
	// }
	// cats.Close()

	var cats = OpenJsonFile()
	for index := range cats {
		if cats[index].Id == id {
			return cats[index], 1
		}
	}
	var cat = models.Cat{}
	return cat, 0
}

func GetCatsByBreedId(breedId string) []models.Cat {

	//If SQLite was working
	// db, err := sql.Open("sqlite3", "../data/catlover.db")
	// cats, err := db.Query("SELECT * FROM Cats WHERE BreedId = " + breedId)
	// if err != nil {
	// 	panic(err)
	// }
	// cats.Close()

	var cats = OpenJsonFile()
	var catsBreeds []models.Cat
	for index := range cats {
		if cats[index].BreedId == breedId {
			catsBreeds = append(catsBreeds, cats[index])
		}
	}
	return catsBreeds
}

func GetCatFavorites() []models.Cat {

	//If SQLite was working
	// db, err := sql.Open("sqlite3", "../data/catlover.db")
	// cats, err := db.Query("SELECT * FROM Cats WHERE IsFavorite = 1")
	// if err != nil {
	// 	panic(err)
	// }
	// cats.Close()

	var cats = OpenJsonFile()
	var catsFavorites []models.Cat
	for index := range cats {
		if cats[index].IsFavorite {
			catsFavorites = append(catsFavorites, cats[index])
		}
	}
	return catsFavorites
}

func UpdateCat(id string, c *gin.Context) (models.Cat, int32) {

	//If SQLite was working
	// db, err := sql.Open("sqlite3", "../data/catlover.db")
	// stmt, err = db.Prepare("UPDATE cATS set IsFavorite=? where Id=?")
	// res, err = stmt.Exec(1, id)
	// if err != nil {
	// 	panic(err)
	// }
	// cats.Close()

	catOld, count := GetCatById(id)
	if count == 0 {
		var cat = models.Cat{}
		return cat, 0
	}

	var inputCat models.Cat
	if err := c.ShouldBindJSON(&inputCat); err != nil {
		var cat = models.Cat{}
		return cat, 0
	}

	catOld.BreedId = inputCat.BreedId
	catOld.PhotoUrl = inputCat.PhotoUrl
	catOld.IsFavorite = inputCat.IsFavorite

	UpdateJsonFile(id, catOld)

	catUpdated, count := GetCatById(id)
	if count == 0 {
		var cat = models.Cat{}
		return cat, 0
	}

	return catUpdated, 1
}

func OpenJsonFile() []models.Cat {
	jsonFile, err := os.Open("data/cats.json")
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
	jsonFile, errorOpenFile := os.OpenFile("data/cats.json", os.O_RDWR, 0755)

	if errorOpenFile != nil {
		log.Fatalf("failed opening file: %s", errorOpenFile)
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var cats []models.Cat
	json.Unmarshal(byteValue, &cats)

	for index := range cats {
		if cats[index].Id == id {
			cats[index].BreedId = cat.BreedId
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
