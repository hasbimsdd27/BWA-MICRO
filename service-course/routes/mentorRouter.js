const express = require("express");
const router = express.Router();
const MentorController = require("../controller/mentors");

router.post("/", MentorController.create);
router.put("/:id", MentorController.update);
router.delete("/:id", MentorController.destroy);
router.get("/", MentorController.getAll);
router.get("/:id", MentorController.get);

module.exports = router;
