const { Review, MyCourse } = require("../../models");

module.exports = async (req, res) => {
  try {
    const review = await Review.findOne({
      where: { id: req.params.id },
    });

    if (!review) {
      return res.status(404).json({
        status: "error",
        message: "review not found",
      });
    }

    await Review.destroy({ where: { id: req.params.id } });

    return res.json({ status: "success", message: "review deleted" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
