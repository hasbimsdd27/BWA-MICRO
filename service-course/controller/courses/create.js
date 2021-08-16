const { Mentor, Course } = require("../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      name: "string",
      certificate: "boolean",
      thumbnail: "url",
      type: { type: "enum", values: ["free", "premium"] },
      status: { type: "enum", values: ["draft", "published"] },
      price: "number",
      level: {
        type: "enum",
        values: ["all-level", "beginner", "intermediate", "advance"],
      },
      mentor_id: "number",
      description: "string",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
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

    const data = await Course.create(req.body);

    return res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
