var express = require("express");
var router = express.Router();
const userController = require("../controller/user");

/**LogIn API */
router.post("/login", userController.userLogin);

/**
 * SignUp API
 */
router.post("/signup", userController.userSignup);

module.exports = router;
