const express = require("express");
const router = express.Router();
const MentorController = require("../controller/mentors");

router.get("/", MentorController.getAll);
router.post("/", MentorController.create);
router.get("/:id", MentorController.get);
router.put("/:id", MentorController.update);
router.delete("/:id", MentorController.destroy);

module.exports = router;
