const { User, RefreshToken } = require("../../models");

module.exports = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.user_id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "user not found" });
    }

    await RefreshToken.destroy({ where: { user_id: req.body.user_id } });

    return res.json({ status: "success", message: "refresh token deleted" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
