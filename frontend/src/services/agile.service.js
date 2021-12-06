const axios = require("axios");
const API_URL = "http://localhost:8000";

class AgileService {
  getItems() {
    return axios
      .get(API_URL + "/api/agile")
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return error;
      });
  }
  addItem(parameters) {
    var data = {
      type: parameters.type.toLowerCase(),
      description: parameters.description,
    };

    var config = {
      method: "post",
      url: API_URL + "/api/agile",
      data: data,
    };

    return axios(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  editItem(parameters) {
    var data = {
      type: parameters.type.toLowerCase(),
      description: parameters.description,
    };

    var config = {
      method: "patch",
      url: API_URL + "/api/agile/" + parameters.id,
      data: data,
    };

    return axios(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  deleteItem(id) {
    return axios
      .delete(API_URL + "/api/agile/" + id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default new AgileService();
