const express = require("express");
const router = express.Router();
const Controller = require("../controller/imageCourses");

router.post("/", Controller.create);
router.delete("/:id", Controller.destroy);

module.exports = router;
