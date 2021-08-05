const express = require("express");
const router = express.Router();
const RefreshTokenController = require("../controller/refreshToken");

router.post("/", RefreshTokenController.create);
router.get("/", RefreshTokenController.getToken);

module.exports = router;
