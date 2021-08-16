const express = require("express");
const router = express.Router();
const Controller = require("../controller/webhook");

router.post("/", Controller.midtrans);

module.exports = router;
