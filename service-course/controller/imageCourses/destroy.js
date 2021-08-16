const { ImageCourse } = require("../../models");

module.exports = async (req, res) => {
  try {
    const image = await ImageCourse.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    if (!image) {
      return res.status(404).json({
        status: "error",
        message: "image not found",
      });
    }

    await ImageCourse.create({ where: { id: req.params.id } });

    return res.json({
      status: "success",
      message: "image deleted",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
