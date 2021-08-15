const { Review, MyCourse } = require("../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      user_id: "number",
      course_id: "number",
      rating: "number|min:1|max:5",
      note: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const isExist = await Review.findOne({
      where: { user_id: req.body.user_id, course_id: req.body.course_id },
      raw: true,
    });

    if (isExist) {
      return res.status(409).json({
        status: "error",
        message: "review already exist",
      });
    }

    // const isHasCourse = await MyCourse.findOne({
    //   where: { user_id: req.body.user_id, course_id: req.body.course_id },
    // });

    // if (!isHasCourse) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "user does not have this course",
    //   });
    // }

    const data = await Review.create(req.body, { raw: true });

    return res.json({ status: "success", data });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
