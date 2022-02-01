const baseURL = "http://localhost:10000/";

const RequestsService = {
  GetAllData: function (model) {
    fetch(baseURL + model)
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

  GetOneDataById: function (model, id) {},

  UpdateDataById: function (model, id) {},
};

export default RequestsService;
