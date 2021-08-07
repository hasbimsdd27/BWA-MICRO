const express = require("express");
const router = express.Router();
const UsersController = require("../controller/users");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.put("/", verifyToken, UsersController.update);
router.get("/", verifyToken, UsersController.getUser);
router.post("/logout", verifyToken, UsersController.logout);

module.exports = router;
