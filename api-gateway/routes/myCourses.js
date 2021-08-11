const express = require("express");
const router = express.Router();
const myCoursesController = require("../controller/myCourses");

router.get("/", myCoursesController.get);
router.post("/", myCoursesController.create);

module.exports = router;
