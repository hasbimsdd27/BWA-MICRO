const express = require("express");
const router = express.Router();
const CoursesController = require("../controller/courses");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, CoursesController.create);
router.put("/:id", verifyToken, CoursesController.update);
router.delete("/:id", verifyToken, CoursesController.destroy);

router.get("/", CoursesController.getAll);
router.get("/:id", CoursesController.get);

module.exports = router;
