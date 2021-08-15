const express = require("express");
const router = express.Router();
const Controller = require("../controller/reviews");

router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.destroy);

module.exports = router;
