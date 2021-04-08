const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signUpValidator, loginValidator } = require("../validator");
const { signup } = require("../controller/user");

const isAdmin = require("../middleware/isAdmin")

// router.get('/',user.getAllUser)
router.post("/signup", signUpValidator, isAdmin, signup);
router.post(
    "/signin",
    loginValidator,
    passport.authenticate("login", { session: false }),
    (req, res) => {
        res.json(req.user);
    },
);

module.exports = router;
