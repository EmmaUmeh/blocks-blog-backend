
const UserControllers = require("../controllers/UserController");
const express = require("express");
const router = express.Router();


router.post("/register", UserControllers.register);
router.post("/login", UserControllers.login);

module.exports = router;