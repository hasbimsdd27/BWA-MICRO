const axios = require("./axios");

const api = axios(process.env.URL_SERVICE_ORDER_PAYMENT);

const serviceDownResponse = {
  response: {
    status: 500,
    data: {
      status: "error",
      message: "service user unavailable",
    },
  },
};

const createOrder = async (payload) => {
  try {
    const { data } = await api.post(`/orders`, payload);
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
  createOrder,
};
