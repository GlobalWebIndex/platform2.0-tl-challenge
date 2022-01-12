package services

import (
	"context"
	"fmt"
	"go-gwi/models"
	"os"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-redis/redis/v8"
	"github.com/google/uuid"
)

type TokenService interface {
	Generate(userId int) (string, error)
	Get(tokenId string) (string, error)
	GetJwtToken(tokenId string) (*jwt.Token, error)
	GetUserId(tokenId string) (int, error)
	Verify(tokenId string) (bool, error)
	Cache(token string) (string, error)
	Refresh(tokenId string) error
	Revoke(tokenId string) error
}

type tokenService struct {
	redis         *redis.Client
	ctx           context.Context
	tokenLifetime time.Duration
}

func NewTokenService(redis *redis.Client) TokenService {
	tokenLifetime := getTokenLifetime()
	return &tokenService{redis: redis, ctx: context.Background(), tokenLifetime: tokenLifetime}
}

func (s *tokenService) Generate(userId int) (string, error) {
	claims := &models.Claims{
		UserId: userId,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(s.tokenLifetime).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signKey := []byte(os.Getenv("JWT_TOKEN_SIGN_KEY"))
	tokenString, err := token.SignedString([]byte(signKey))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (s *tokenService) Get(tokenId string) (string, error) {
	token, err := s.redis.Get(s.ctx, tokenId).Result()
	if err == redis.Nil {
		return "", err
	}

	return token, nil
}

func (s *tokenService) GetJwtToken(tokenId string) (*jwt.Token, error) {
	tokenString, err := s.Get(tokenId)
	if err == redis.Nil {
		return nil, err
	}

	signKey := []byte(os.Getenv("JWT_TOKEN_SIGN_KEY"))

	claims := &models.Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("there was an error in parsing token")
		}
		return signKey, nil
	})

	if err != nil {
		return nil, err
	}

	return token, nil
}

func (s *tokenService) GetUserId(tokenId string) (int, error) {

	token, err := s.GetJwtToken(tokenId)
	if err != nil {
		return 0, err
	}

	claims := token.Claims.(*models.Claims)
	return claims.UserId, nil
}

func (s *tokenService) Verify(tokenId string) (bool, error) {

	token, err := s.GetJwtToken(tokenId)

	if err != nil {
		return false, err
	}
	return token.Valid, nil
}

func (s *tokenService) Cache(token string) (string, error) {
	tokenId := uuid.New().String()

	err := s.redis.Set(s.ctx, tokenId, token, s.tokenLifetime).Err()
	if err != nil {
		return "", err
	}

	return tokenId, nil
}

func (s *tokenService) Refresh(tokenId string) error {
	err := s.redis.Expire(s.ctx, tokenId, s.tokenLifetime).Err()
	if err != nil {
		return err
	}

	return nil
}

func (s *tokenService) Revoke(tokenId string) error {
	err := s.redis.Del(s.ctx, tokenId).Err()
	if err != nil {
		return err
	}

	return nil
}

func getTokenLifetime() time.Duration {
	tokenLifetimeEnv := os.Getenv("JWT_TOKEN_LIFETIME")
	tokenLifetimeMinutes, err := strconv.Atoi(tokenLifetimeEnv)
	if err != nil {
		panic(err)
	}
	tokenLifetime := time.Duration(tokenLifetimeMinutes) * time.Minute
	return tokenLifetime
}
