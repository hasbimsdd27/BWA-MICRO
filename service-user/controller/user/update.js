const bcrypt = require("bcrypt");
const { User } = require("../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      name: "string|empty:false",
      email: "email|empty:false",
      password: "string|min:6",
      profession: "string|optional",
      avatar: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({ status: "error", message: validate });
    }
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "user not found" });
    }

    const { email } = req.body;

    if (email) {
      const checkEmail = await User.findOne({
        where: { email },
      });

      if (checkEmail && email !== user.email) {
        return res
          .status(409)
          .json({ status: "error", message: "email already exist" });
      }
    }

    const password = await bcrypt.hash(req.body.password, 10);

    await user.update({ ...req.body, password });

    return res.json({
      status: "success",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        profession: user.profession,
      },
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
