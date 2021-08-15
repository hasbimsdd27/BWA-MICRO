const { Mentor, Course } = require("../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      name: "string|optional",
      certificate: "boolean|optional",
      thumbnail: "url|optional",
      type: { type: "enum", values: ["free", "premium"], optional: true },
      status: { type: "enum", values: ["draft", "published"], optional: true },
      price: "number|optional",
      level: {
        type: "enum",
        values: ["all-level", "beginner", "intermediate", "advance"],
        optional: true,
      },
      mentor_id: "number|optional",
      description: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

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

    const mentor = await Mentor.findOne({
      where: { id: req.body.mentor_id },
      raw: true,
    });
    if (!mentor) {
      return res.status(404).json({
        status: "error",
        message: "mentor not found",
      });
    }

    if (req.body.type === "premium" && req.body.price === 0) {
      return res.status(400).json({
        status: "error",
        message: "price must be grater than 0 when course is premium",
      });
    }

    await Course.update(req.body, { where: { id: req.params.id } });

    return res.json({
      status: "success",
      data: { ...course, ...req.body },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
