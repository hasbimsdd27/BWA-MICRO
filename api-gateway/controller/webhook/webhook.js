const APIadapter = require("../../utils/axios");

const api = APIadapter(process.env.URL_SERVICE_ORDER_PAYMENT);

module.exports = async (req, res) => {
  try {
    const webhook = await api.post("/api/webhook", req.body);
    return res.json(webhook.data);
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
