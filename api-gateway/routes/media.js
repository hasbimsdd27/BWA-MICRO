const express = require("express");
const router = express.Router();
const MediaController = require("../controller/media");

router.post("/", MediaController.create);
router.get("/", MediaController.getAll);
router.delete("/:id", MediaController.delete);

module.exports = router;
