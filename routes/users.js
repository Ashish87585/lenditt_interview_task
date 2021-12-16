const express = require("express");
const {isAuthenticatedUser} = require("../middleware/auth");
const { register, login, getUser, logout } = require("../controllers/userController");
const router = express.Router();

router
  .route("/getUser")
  .get(isAuthenticatedUser, getUser);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout)
module.exports = router;
