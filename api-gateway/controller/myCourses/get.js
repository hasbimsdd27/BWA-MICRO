const APIadapter = require("../../utils/axios");

const api = APIadapter(process.env.URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const myCourses = await api.get(`/api/my-courses/`, {
      params: { user_id: req.user.data.id },
    });
    return res.json(myCourses.data);
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
