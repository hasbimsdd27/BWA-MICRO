const { Op } = require("sequelize");
const { Course } = require("../../models");

module.exports = async (req, res) => {
  try {
    const q = req.query.q;
    const status = req.query.status;

    const sqlOptions = { where: {}, raw: true };

    if (q) {
      sqlOptions.where = { ...sqlOptions.where, name: { [Op.like]: `%${q}%` } };
    }

    if (status) {
      sqlOptions.where = { ...sqlOptions.where, status };
    }

    const data = await Course.findAll(sqlOptions);

    return res.json({
      status: "success",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
