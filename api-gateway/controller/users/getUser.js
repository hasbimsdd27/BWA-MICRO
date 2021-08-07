const APIadapter = require("../../utils/axios");

const api = APIadapter(process.env.URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const user = await api.get(`/users/${req.user.data.id}`);
    return res.json(user.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
