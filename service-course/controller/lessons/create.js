const { Chapter, Lesson } = require("../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      name: "string",
      chapter_id: "number",
      video: "string",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
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

    const data = await Lesson.create(req.body);

    return res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
