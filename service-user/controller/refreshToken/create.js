const { User, RefreshToken } = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      refresh_token: "string",
      user_id: "number",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({ status: "error", message: validate });
    }

    const user = await User.findByPk(req.body.user_id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "user not found" });
    }

    const createdRefreshToken = await RefreshToken.create({
      token: req.body.refresh_token,
      user_id: req.body.user_id,
    });

    return res.json({
      status: "success",
      data: { id: createdRefreshToken.id },
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
