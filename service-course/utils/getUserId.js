const axios = require("./axios");

const api = axios(process.env.URL_SERVICE_COURSE);

const serviceDownResponse = {
  response: {
    status: 500,
    data: {
      status: "error",
      message: "service user unavailable",
    },
  },
};

const getUser = async (userId) => {
  try {
    const { data } = await api.get(`users/${userId}`);
    return data;
  } catch (error) {
    if (error.response) {
      return error;
    } else {
      return serviceDownResponse;
    }
  }
};

const getUsers = async (userIds) => {
  try {
    const { data } = await api.get(`/users`, { params: { user_ids: userIds } });
    return data;
  } catch (error) {
    if (error.response) {
      return error;
    } else {
      return serviceDownResponse;
    }
  }
};

module.exports = {
  getUser,
  getUsers,
};
