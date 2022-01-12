package services

import (
	"go-gwi/api/contracts"
	"go-gwi/helpers"
	"go-gwi/models"
	"go-gwi/repositories"
)

type UserService interface {
	Register(user *contracts.User) (int, error)
	Login(email string, password string) (string, error)
	Logout(tokenId string) error
	GetFavourites(userId int) ([]contracts.Favourite, error)
	CreateFavourite(cat contracts.Cat) (bool, error)
	DeleteFavourite(id int) (bool, error)
}

type userService struct {
	userRepository       repositories.UserRepository
	favouritesRepository repositories.FavouritesRepository
	tokenService         TokenService
}

func NewUserService(userRepository repositories.UserRepository, favouritesRepository repositories.FavouritesRepository, tokenService TokenService) UserService {
	return &userService{userRepository: userRepository, favouritesRepository: favouritesRepository, tokenService: tokenService}
}

func (s *userService) Register(user *contracts.User) (int, error) {
	userEntity := models.User{}

	helpers.ConvertUser(user, &userEntity)

	userEntity.Password = helpers.Sha256hash(userEntity.Password)

	dbUser, err := s.userRepository.Create(&userEntity)
	if err != nil {
		return -1, err
	}

	return dbUser.Id, nil
}

func (s *userService) Login(email string, password string) (string, error) {

	hashedPassword := helpers.Sha256hash(password)
	user, err := s.userRepository.GetByEmailPassword(email, hashedPassword)
	if err != nil {
		return "", err
	}

	token, err := s.tokenService.Generate(user.Id)
	if err != nil {
		return "", err
	}

	tokenId, err := s.tokenService.Cache(token)
	if err != nil {
		return "", err
	}

	return tokenId, nil
}

func (s *userService) Logout(tokenId string) error {
	err := s.tokenService.Revoke(tokenId)
	if err != nil {
		return err
	}

	return nil
}

func (s *userService) GetFavourites(userId int) ([]contracts.Favourite, error) {
	favourites := make([]contracts.Favourite, 0)

	modelFavourites, err := s.favouritesRepository.GetByUserId(userId)
	if err != nil {
		return nil, err
	}

	helpers.ConvertFavourites(&favourites, modelFavourites)

	return favourites, nil
}

func (s *userService) CreateFavourite(cat contracts.Cat) (bool, error) {
	modelFavourite := models.Favourite{
		CatId:  cat.Id,
		UserId: 1,
	}

	result, err := s.favouritesRepository.Create(modelFavourite)
	if err != nil {
		return false, err
	}

	return result, nil
}

func (s *userService) DeleteFavourite(id int) (bool, error) {
	result, err := s.favouritesRepository.Remove(id)
	if err != nil {
		return false, err
	}

	return result, nil
}
