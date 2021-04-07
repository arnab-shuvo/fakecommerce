const express = require("express");
const router = express.Router();
const product = require("../controller/product");
const isAdmin = require("../middleware/isAdmin");
const productValidator = require("../validator/productValidator");
const { isAuth } = require("../auth/auth");

router.get("/", product.getAllProducts);
router.get("/:id", product.getProduct);
router.get("/category/:categoryid", product.getProductsInCategory);
router.post("/", productValidator, isAuth, isAdmin, product.addProduct);
router.patch("/:id", isAuth, isAdmin, product.editProduct);
router.delete("/:id", isAuth, isAdmin, product.deleteProduct);
router.get("/files/:file_name",product.sendImageData)


module.exports = router;
