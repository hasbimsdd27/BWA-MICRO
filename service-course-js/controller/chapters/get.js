const { Chapter } = require("../../models");

module.exports = async (req, res) => {
  try {
    const chapter = await Chapter.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    if (!chapter) {
      return res.status(404).json({
        status: "error",
        message: "chapter not found",
      });
    }

    return res.json({
      status: "success",
      data: chapter,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
