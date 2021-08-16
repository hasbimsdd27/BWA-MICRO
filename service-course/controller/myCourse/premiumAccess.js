const { MyCourse } = require("../../models");

module.exports = async (req, res) => {
  try {
    const data = await MyCourse.create(req.body);
    return res.send({
      status: "success",
      data,
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      data,
    });
  }
};
