const { Mentor } = require("../../models");
const Validator = require("fastest-validator");

module.exports = async (req, res) => {
  try {
    const data = await Mentor.findAll({
      raw: true,
    });

    return res.json({ status: "success", data });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
