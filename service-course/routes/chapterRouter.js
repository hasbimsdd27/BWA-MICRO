const express = require("express");
const router = express.Router();
const Controller = require("../controller/chapters");

router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.destroy);
router.get("/", Controller.getAll);
router.get("/:id", Controller.get);

module.exports = router;
