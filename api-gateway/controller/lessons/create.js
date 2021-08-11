const APIadapter = require("../../utils/axios");

const api = APIadapter(process.env.URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const lesson = await api.post("/api/lessons", req.body);
    return res.json(lesson.data);
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
