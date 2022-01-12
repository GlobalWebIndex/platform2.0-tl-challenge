package app

import (
	"fmt"
	"os"

	"github.com/go-redis/redis/v8"
)

func CacheInit() *redis.Client {

	rdHost := os.Getenv("REDIS_HOST")
	rdPort := os.Getenv("REDIS_PORT")
	rdPass := os.Getenv("REDIS_PASSWORD")

	rdAddress := fmt.Sprintf("%s:%s", rdHost, rdPort)

	redisClient := redis.NewClient(&redis.Options{
		Addr:     rdAddress,
		Password: rdPass,
		DB:       0,
	})

	return redisClient
}
