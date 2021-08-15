const { Lesson } = require("../../models");

module.exports = async (req, res) => {
  try {
    const sqlOptions = {
      where: {},
      raw: true,
    };

    const { chapter_id } = req.query;

    if (chapter_id) {
      sqlOptions.where = { ...sqlOptions.where, chapter_id };
    }

    const data = await Lesson.findAll(sqlOptions);

    return res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
