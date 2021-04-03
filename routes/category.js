const express = require("express");
const router = express.Router();
const category = require("../controller/category");
const passport = require("passport");
const isAdmin = require("../middleware/isAdmin");
const { categoryValidator } = require("../validator");

router.get("/", category.getAllCategories);
router.post(
    "/",
    categoryValidator,
    passport.authenticate("bearer", { session: false }),
    isAdmin,
    category.addCategory,
);
router.patch(
    "/:categoryId",
    categoryValidator,
    passport.authenticate("bearer", { session: false }),
    isAdmin,
    category.editCategory,
);
router.delete(
    "/:categoryId",
    passport.authenticate("bearer", { session: false }),
    isAdmin,
    category.deleteCategory,
);

module.exports = router;
