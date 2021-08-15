const { Mentor } = require("../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    console.log(req.params.id);
    const schema = {
      name: "string|optional",
      profile: "url|optional",
      profession: "string|optional",
      email: "email|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const mentor = await Mentor.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    if (!mentor) {
      return res.status(404).json({
        status: "error",
        message: "mentor not found",
      });
    }

    const data = await Mentor.update(req.body, {
      where: { id: req.params.id },
      raw: true,
    });

    return res.json({ status: "success", data: { ...mentor, ...req.body } });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
