const { Course } = require("../../models");

module.exports = async (req, res) => {
  try {
    const course = await Course.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    if (!course) {
      return res.status(404).json({
        status: "error",
        message: "course not found",
      });
    }

    await Course.destroy({ where: { id: req.params.id } });

    return res.json({
      status: "success",
      message: "course deleted",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
