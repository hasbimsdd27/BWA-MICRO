const { Course, MyCourse } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { user_id } = req.query;

    const sqlOptions = {
      where: {},
      include: [
        {
          model: Course,
          as: "course",
        },
      ],
    };
    if (user_id) {
      sqlOptions.where = { ...sqlOptions.where, user_id };
    }
    const data = await MyCourse.findAll(sqlOptions);
    return res.send({ status: "success", data });
  } catch (error) {
    return res.status(400).send({ status: "error", message: error.message });
  }
};
