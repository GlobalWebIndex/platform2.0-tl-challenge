package repositories

import (
	"go-gwi/helpers"
	"go-gwi/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type CatsRepository interface {
	GetRandom(count int) ([]models.Cat, error)
	GetAll(page int, pageSize int) ([]models.Cat, error)
	GetByBreedId(breedId int, page int, pageSize int) ([]models.Cat, error)
}

type catsRepository struct {
	db gorm.DB
}

func NewCatsRepository(db gorm.DB) CatsRepository {
	return &catsRepository{db: db}
}

func (r *catsRepository) GetRandom(count int) ([]models.Cat, error) {
	cats := make([]models.Cat, 0)

	err := r.db.Limit(count).Preload("Breed").Clauses(clause.OrderBy{
		Expression: clause.Expr{SQL: "random()"},
	}).Find(&cats).Error

	if err != nil {
		return nil, err
	}

	return cats, nil
}

func (r *catsRepository) GetAll(page int, pageSize int) ([]models.Cat, error) {
	cats := make([]models.Cat, 0)

	err := r.db.Scopes(helpers.Paginate(page, pageSize)).Find(&cats).Error

	if err != nil {
		return nil, err
	}

	return cats, nil
}

func (r *catsRepository) GetByBreedId(breedId int, page int, pageSize int) ([]models.Cat, error) {
	cats := make([]models.Cat, 0)

	err := r.db.Scopes(helpers.Paginate(page, pageSize)).Where("breed_id = ?", breedId).Find(&cats).Error

	if err != nil {
		return nil, err
	}

	return cats, nil
}
