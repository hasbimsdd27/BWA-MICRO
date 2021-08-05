const axios = require("axios");

module.exports = (baseURL) => {
  return axios.create({
    baseURL,
    timeout: parseInt(process.env.TIMEOUT),
  });
};
