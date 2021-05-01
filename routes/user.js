const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signUpValidator, loginValidator } = require("../validator");
const {
    signup,
    addUser,
    editUser,
    deleteUser,
    getAllUser,
    getUser,
    getMyInfo,
    updateMyInfo,
} = require("../controller/user");
const { isAuth } = require("../auth/auth");
const isAdmin = require("../middleware/isAdmin");

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
router.post("/user", signUpValidator, isAuth, isAdmin, addUser);
router.patch("/user/:id", isAuth, isAdmin, editUser);
router.delete("/user/:id", isAuth, isAdmin, deleteUser);
router.get("/user/", isAuth, isAdmin, getAllUser);
router.get("/user/:id", isAuth, isAdmin, getUser);
router.get("/my-detail", isAuth, getMyInfo);
router.patch("/my-detail", isAuth, updateMyInfo);

module.exports = router;
