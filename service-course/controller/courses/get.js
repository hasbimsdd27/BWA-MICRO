const {
  Course,
  Mentor,
  Lesson,
  Chapter,
  ImageCourse,
  MyCourse,
} = require("../../models");
const { getUsers } = require("../../utils/getUserId");

module.exports = async (req, res) => {
  try {
    const data = await Course.findOne({
      where: { id: req.params.id },
      raw: false,
      include: [
        {
          model: Mentor,
          as: "mentor",
        },
        {
          model: MyCourse,
          as: "students",
          raw: true,
        },
        {
          model: Chapter,
          as: "chapters",
          include: [
            {
              model: Lesson,
              as: "lessons",
            },
          ],
        },
        {
          model: ImageCourse,
          as: "images",
        },
      ],
    });

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "course not found",
      });
    }

    const studentsId = data.students.map((item) => item.id);
    const studentsData = await getUsers(studentsId);
    const objStudent = studentsData.data.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});

    const students = data
      .toJSON()
      .students.map((item) => ({ ...item, ...objStudent[item.id] }));

    return res.json({
      status: "success",
      data: { ...data.toJSON(), students },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
