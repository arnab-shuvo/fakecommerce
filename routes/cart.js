const express = require('express');
const router = express.Router();
const cart = require('../controller/cart');
const cartValidator = require('../validator/cartValidator');
const { isAuth } = require('../auth/auth');

router.get('/', isAuth, cart.getCartsbyUserid);

router.post('/', isAuth, cartValidator, cart.addCart);
router.delete('/:id', cart.deleteCart);

module.exports = router;
