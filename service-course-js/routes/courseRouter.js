const express = require("express");
const router = express.Router();
const CourseController = require("../controller/courses");

router.post("/", CourseController.create);
router.put("/:id", CourseController.update);
router.delete("/:id", CourseController.destroy);
router.get("/", CourseController.getAll);
router.get("/:id", CourseController.get);

module.exports = router;
