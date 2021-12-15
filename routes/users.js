const express = require("express");
const passport = require("passport");
const { register, login, getUser, logout } = require("../controllers/userController");
const router = express.Router();

router
  .route("/getUser")
  .get(passport.authenticate("jwt", { session: false }), getUser);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout)
module.exports = router;
