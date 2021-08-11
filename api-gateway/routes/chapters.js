const express = require("express");
const router = express.Router();
const ChaptersController = require("../controller/chapters");

router.post("/", ChaptersController.create);
router.put("/:id", ChaptersController.update);
router.delete("/:id", ChaptersController.destroy);
router.get("/:id", ChaptersController.get);
router.get("/", ChaptersController.getAll);

module.exports = router;
