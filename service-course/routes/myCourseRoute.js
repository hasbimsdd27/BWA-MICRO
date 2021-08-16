const express = require("express");
const router = express.Router();
const Controller = require("../controller/myCourse");

router.post("/", Controller.create);
// router.put("/:id", Controller.update);
// router.delete("/:id", Controller.destroy);
router.get("/", Controller.getAll);

module.exports = router;
