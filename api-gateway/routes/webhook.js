const express = require("express");
const router = express.Router();
const WebhookController = require("../controller/webhook");

router.post("/", WebhookController.webhook);

module.exports = router;
