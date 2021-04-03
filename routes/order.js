const express = require("express");
const router = express.Router();
const order = require("../controller/order");
const orderValidator = require("../validator/orderValidator");
const { isAuth } = require("../auth/auth");
const isAdmin = require("../middleware/isAdmin");

router.get("/", isAuth, isAdmin, order.getAllOrder);

router.get("/checkout", isAuth, order.createOrder);
router.patch("/:orderId", isAuth, orderValidator, isAdmin, order.updateOrder);

module.exports = router;
