const APIadapter = require("../../utils/axios");

const api = APIadapter(process.env.URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const myCourse = await api.delete(`/api/reviews/${req.params.id}`);
    return res.json(myCourse.data);
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
