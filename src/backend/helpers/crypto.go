package helpers

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"os"
)

func Sha256hash(data string) string {
	secret := os.Getenv("ENCRYPTION_KEY")

	h := hmac.New(sha256.New, []byte(secret))
	h.Write([]byte(data))

	sha := hex.EncodeToString(h.Sum(nil))
	return sha
}
