package services

import (
	"go-gwi/api/contracts"
	"go-gwi/helpers"
	"go-gwi/repositories"
)

type CatsService interface {
	GetRandomCats() ([]contracts.Cat, error)
	GetCats(page int, pageSize int) ([]contracts.Cat, error)
	GetCatsByBreedId(breedId int, page int, pageSize int) ([]contracts.Cat, error)
	GetBreeds(page int, pageSize int) ([]contracts.Breed, error)
	GetBreed(id int) (contracts.Breed, error)
}

type catsService struct {
	catsRepository   repositories.CatsRepository
	breedsRepository repositories.BreedsRepository
}

func NewCatsService(catsRepository repositories.CatsRepository, breedsRepository repositories.BreedsRepository) CatsService {
	return &catsService{catsRepository: catsRepository, breedsRepository: breedsRepository}
}

func (s *catsService) GetRandomCats() ([]contracts.Cat, error) {
	cats := make([]contracts.Cat, 0)

	modelCats, err := s.catsRepository.GetRandom(10)
	if err != nil {
		return nil, err
	}

	helpers.ConvertCats(&cats, modelCats)

	return cats, nil
}

func (s *catsService) GetCats(page int, pageSize int) ([]contracts.Cat, error) {
	cats := make([]contracts.Cat, 0)

	modelCats, err := s.catsRepository.GetAll(page, pageSize)
	if err != nil {
		return nil, err
	}

	helpers.ConvertCats(&cats, modelCats)

	return cats, nil
}

func (s *catsService) GetCatsByBreedId(breedId int, page int, pageSize int) ([]contracts.Cat, error) {
	cats := make([]contracts.Cat, 0)

	modelCats, err := s.catsRepository.GetByBreedId(breedId, page, pageSize)
	if err != nil {
		return nil, err
	}

	helpers.ConvertCats(&cats, modelCats)

	return cats, nil
}

func (s *catsService) GetBreeds(page int, pageSize int) ([]contracts.Breed, error) {
	breeds := make([]contracts.Breed, 0)

	modelBreeds, err := s.breedsRepository.GetAll(page, pageSize)
	if err != nil {
		return nil, err
	}

	helpers.ConvertBreeds(&breeds, modelBreeds)

	return breeds, nil
}

func (s *catsService) GetBreed(id int) (contracts.Breed, error) {
	breed := contracts.Breed{}

	modelBreed, err := s.breedsRepository.GetById(id)
	if err != nil {
		return breed, err
	}

	helpers.ConvertBreed(&breed, *modelBreed)

	return breed, nil
}
