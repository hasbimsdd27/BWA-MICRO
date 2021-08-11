const express = require("express");
const router = express.Router();
const LessonsController = require("../controller/lessons");

router.post("/", LessonsController.create);
router.put("/:id", LessonsController.update);
router.delete("/:id", LessonsController.destroy);
router.get("/:id", LessonsController.get);
router.get("/", LessonsController.getAll);

module.exports = router;
