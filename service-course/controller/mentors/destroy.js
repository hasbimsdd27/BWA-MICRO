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

    await Mentor.destroy({ where: { id: req.params.id } });

    return res.json({ status: "success", message: "mentor deleted" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
