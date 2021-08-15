const { Chapter } = require("../../models");

module.exports = async (req, res) => {
  try {
    const sqlOptions = {
      where: {},
      raw: true,
    };

    const { course_id } = req.query;

    if (course_id) {
      sqlOptions.where = { ...sqlOptions.where, course_id };
    }

    const data = await Chapter.findAll(sqlOptions);

    return res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
