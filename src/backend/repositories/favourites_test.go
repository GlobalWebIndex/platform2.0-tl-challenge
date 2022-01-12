package repositories_test

import (
	"database/sql"
	"regexp"

	"github.com/DATA-DOG/go-sqlmock"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"go-gwi/repositories"
)

var _ = Describe("Favourites", func() {
	var favouritesRepository repositories.FavouritesRepository
	var mock sqlmock.Sqlmock

	BeforeEach(func() {
		var db *sql.DB
		var err error

		db, mock, err = sqlmock.New()
		Expect(err).To(BeNil())
		Expect(mock).NotTo(BeNil())

		dialector := postgres.New(postgres.Config{
			DSN:                  "sqlmock_db_0",
			DriverName:           "postgres",
			Conn:                 db,
			PreferSimpleProtocol: true,
		})
		gormDb, err := gorm.Open(dialector, &gorm.Config{})
		Expect(err).To(BeNil())

		favouritesRepository = repositories.NewFavouritesRepository(*gormDb)
		Expect(err).To(BeNil())
	})

	AfterEach(func() {
		err := mock.ExpectationsWereMet()
		Expect(err).To(BeNil())
	})

	Describe("GetByUserId", func() {
		Describe("without results", func() {
			It("returns empty array of favourites", func() {
				// Arrange
				const preloadQuery = `SELECT * FROM "cats" WHERE "cats"."id" = $1`
				const query = `SELECT * FROM "favourites" WHERE user_id = $1`

				preloadRows := sqlmock.
					NewRows([]string{"id", "name", "age", "user_id"}).
					AddRow(1, "cat1", 1, 1)
				rows := sqlmock.
					NewRows([]string{"id", "user_id", "cat_id"}).
					AddRow(1, 1, 1)

				mock.ExpectQuery(regexp.QuoteMeta(query)).WithArgs(1).WillReturnRows(rows)
				mock.ExpectQuery(regexp.QuoteMeta(preloadQuery)).WithArgs(1).WillReturnRows(preloadRows)

				// Act
				favourites, err := favouritesRepository.GetByUserId(1)

				// Assert
				Expect(err).To(BeNil())
				Expect(len(favourites)).To(Equal(1))
			})
		})
	})
})
