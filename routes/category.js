const express = require("express");
const router = express.Router();
const category = require("../controller/category");
const passport = require("passport");
const { isAuth } = require("../auth/auth");
const isAdmin = require("../middleware/isAdmin");
const { categoryValidator } = require("../validator");

router.get("/", category.getAllCategories);
router.post(
    "/",
    categoryValidator,
    isAuth,
    isAdmin,
    category.addCategory,
);
router.patch(
    "/:categoryId",
    categoryValidator,
    isAuth,
    isAdmin,
    category.editCategory,
);
router.delete(
    "/:categoryId",
    isAuth,
    isAdmin,
    category.deleteCategory,
);

module.exports = router;
