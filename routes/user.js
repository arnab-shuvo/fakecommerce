const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signUpValidator, loginValidator } = require("../validator");
const { signup } = require("../controller/user");

// router.get('/',user.getAllUser)
router.post("/signup", signUpValidator, signup);
router.post(
    "/signin",
    loginValidator,
    passport.authenticate("login", { session: false }),
    (req, res) => {
        res.json(req.user);
    },
);

module.exports = router;
