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

    await Chapter.destroy({ where: { id: req.params.id } });

    return res.json({
      status: "success",
      message: "chapter deleted",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
