const express = require("express");
const router = express.Router();
const ReviewController = require("../controller/reviews");

router.post("/", ReviewController.create);
router.put("/:id", ReviewController.update);
router.delete("/:id", ReviewController.destroy);

module.exports = router;
