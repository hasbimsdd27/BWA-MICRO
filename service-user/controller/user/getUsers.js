const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const userIds = req.query.user_ids || [];

    const sqlOptions = {
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    };
    if (userIds.length) {
      sqlOptions.where = { id: userIds };
    }
    const users = await User.findAll(sqlOptions);

    return res.json({ status: "success", data: users });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
