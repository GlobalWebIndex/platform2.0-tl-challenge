package repositories

import (
	"go-gwi/models"

	"gorm.io/gorm"
)

type FavouritesRepository interface {
	GetByUserId(userId int) ([]models.Favourite, error)
	Create(favourite models.Favourite) (bool, error)
	Remove(id int) (bool, error)
}

type favouritesRepository struct {
	db gorm.DB
}

func NewFavouritesRepository(db gorm.DB) FavouritesRepository {
	return &favouritesRepository{db: db}
}

func (r *favouritesRepository) GetByUserId(userId int) ([]models.Favourite, error) {
	favourites := make([]models.Favourite, 0)

	err := r.db.Preload("Cat").Where("user_id = ?", userId).Find(&favourites).Error
	if err != nil {
		return nil, err
	}

	return favourites, nil
}

func (r *favouritesRepository) Create(favourite models.Favourite) (bool, error) {
	err := r.db.Create(&favourite).Error
	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *favouritesRepository) Remove(id int) (bool, error) {
	err := r.db.Delete(&models.Favourite{}, id).Error
	if err != nil {
		return false, err
	}

	return true, nil
}
