const { Chapter, Lesson } = require("../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      name: "string|optional",
      chapter_id: "number|optional",
      video: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

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

    const chapter = await Chapter.findOne({
      where: { id: req.body.chapter_id },
      raw: true,
    });
    if (!chapter) {
      return res.status(404).json({
        status: "error",
        message: "chapter not found",
      });
    }

    await Lesson.update(req.body, { where: { id: req.params.id } });

    return res.json({
      status: "success",
      data: { ...lesson, ...req.body },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
