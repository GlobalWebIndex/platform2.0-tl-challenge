const API_URL = "http://localhost:10000/";

const RequestsService = {
  GetAllData: function (model) {
    fetch(API_URL + model, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((result) => result.json())
      .then(
        (result) => {
          return [result, null];
        },
        (error) => {
          return [null, error];
        }
      );
  },

  GetOneDataById: function (model, id) {
    fetch(API_URL + model + "/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((result) => result.json())
      .then(
        (result) => {
          return [result, null];
        },
        (error) => {
          return [null, error];
        }
      );
  },

  UpdateDataById: function (model, id) {
    fetch(API_URL + model + "/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        breedId: this.props.breedId,
        photoUrl: this.props.photoUrl,
        isFavorite: isFavorite,
      }),
    })
      .then((result) => result.json())
      .then(
        (result) => {
          return [result, null];
        },
        (error) => {
          return [null, error];
        }
      );
  },
};

export default RequestsService;
