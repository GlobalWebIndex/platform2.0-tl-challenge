package repositories

import (
	"go-gwi/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetById(id int) (*models.User, error)
	GetByEmailPassword(email string, password string) (*models.User, error)
	Create(*models.User) (*models.User, error)
}

type userRepository struct {
	db gorm.DB
}

func NewUserRepository(db gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) GetById(id int) (*models.User, error) {
	var user *models.User

	err := r.db.First(&user, id).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userRepository) Create(user *models.User) (*models.User, error) {

	err := r.db.Create(&user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userRepository) GetByEmailPassword(email string, password string) (*models.User, error) {
	var user *models.User

	err := r.db.Where("email = ? and password = ?", email, password).Find(&user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}
