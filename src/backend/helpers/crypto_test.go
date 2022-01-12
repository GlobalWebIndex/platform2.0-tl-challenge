package helpers_test

import (
	"os"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"go-gwi/helpers"
)

var _ = Describe("Crypto", func() {
	BeforeEach(func() {
		os.Setenv("ENCRYPTION_KEY", "key")
	})
	Describe("Sha256hash", func() {
		It("Hash a string", func() {
			var data = "test"

			var result = helpers.Sha256hash(data)

			Expect(result).To(Equal("02afb56304902c656fcb737cdd03de6205bb6d401da2812efd9b2d36a08af159"))
		})
	})
})
