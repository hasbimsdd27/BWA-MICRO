const APIadapter = require("../../utils/axios");

const api = APIadapter(process.env.URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const media = await api.post("/", req.body);
    return res.json(media.data);
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
