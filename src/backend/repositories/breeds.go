package repositories

import (
	"go-gwi/helpers"
	"go-gwi/models"

	"gorm.io/gorm"
)

type BreedsRepository interface {
	GetAll(page int, pageSize int) ([]models.Breed, error)
	GetById(id int) (*models.Breed, error)
}

type breedsRepository struct {
	db gorm.DB
}

func NewBreedsRepository(db gorm.DB) BreedsRepository {
	return &breedsRepository{db: db}
}

func (r *breedsRepository) GetAll(page int, pageSize int) ([]models.Breed, error) {
	breeds := make([]models.Breed, 0)

	err := r.db.Scopes(helpers.Paginate(page, pageSize)).Find(&breeds).Error

	if err != nil {
		return nil, err
	}

	return breeds, nil
}

func (r *breedsRepository) GetById(id int) (*models.Breed, error) {
	var breed *models.Breed

	err := r.db.First(&breed, id).Error

	if err != nil {
		return nil, err
	}

	return breed, nil
}
