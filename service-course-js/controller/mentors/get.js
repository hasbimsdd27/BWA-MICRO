const { Mentor } = require("../../models");
const Validator = require("fastest-validator");

module.exports = async (req, res) => {
  try {
    const mentor = await Mentor.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    if (!mentor) {
      return res.status(404).json({
        status: "error",
        message: "mentor not found",
      });
    }

    return res.json({ status: "success", data: mentor });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
