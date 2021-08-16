const { Course, MyCourse } = require("../../models");
const Validator = require("fastest-validator");
const { getUser } = require("../../utils/getUserId");
const { createOrder } = require("../../utils/createPaymentLink");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      course_id: "number|empty:false",
      user_id: "number|empty:false",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const course = await Course.findOne({ where: { id: req.body.course_id } });

    if (!course) {
      return res.status(404).json({
        status: "error",
        message: "course not found",
      });
    }

    const user = await getUser(req.body.user_id);
    if (user.response) {
      return res.status(user.response.status).send(user.response.data);
    }

    const isExistCourse = await MyCourse.findOne({
      where: {
        ...req.body,
      },
    });
    console.log(isExistCourse);

    if (isExistCourse) {
      return res.status(409).send({
        status: "error",
        message: "user already take this course",
      });
    }

    if (course.type === "premium") {
      try {
        const response = await createOrder({
          user,
          course,
        });
        return res.send({ status: "success", data: response.data });
      } catch (error) {
        return res.status(error.response.status).send(error.response.data);
      }
    } else {
      const data = await MyCourse.create(req.body);
      return res.send({
        status: "success",
        data,
      });
    }
  } catch (error) {
    return res.status(400).send({ status: "error", message: error.message });
  }
};
