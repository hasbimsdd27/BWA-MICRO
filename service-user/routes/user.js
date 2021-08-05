const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/:id", UserController.update);
router.get("/:id", UserController.getUser);
router.get("/", UserController.getUsers);
router.post("/logout", UserController.logout);

module.exports = router;
