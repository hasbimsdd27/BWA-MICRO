const { Lesson } = require("../../models");

module.exports = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    if (!lesson) {
      return res.status(404).json({
        status: "error",
        message: "lesson not found",
      });
    }

    return res.json({
      status: "success",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
