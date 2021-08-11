const express = require("express");
const router = express.Router();
const ImageCourseController = require("../controller/imageCourses");

router.post("/", ImageCourseController.create);
router.delete("/:id", ImageCourseController.destroy);

module.exports = router;
