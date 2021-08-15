const {
  Course,
  Mentor,
  Lesson,
  Chapter,
  ImageCourse,
} = require("../../models");

module.exports = async (req, res) => {
  try {
    const data = await Course.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Mentor,
          as: "mentor",
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

    return res.json({
      status: "success",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
