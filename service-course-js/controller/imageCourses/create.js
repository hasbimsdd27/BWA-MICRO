const { Course, ImageCourse } = require("../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      image: "url",
      course_id: "number",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const course = await Course.findOne({
      where: { id: req.body.course_id },
      raw: true,
    });
    if (!course) {
      return res.status(404).json({
        status: "error",
        message: "course not found",
      });
    }

    const data = await ImageCourse.create(req.body);

    return res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
