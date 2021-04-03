const Cart = require("../model/cart");
const ObjectID = require("mongodb").ObjectID;

module.exports.getCartsbyUserid = async (req, res) => {
    const userId = req.user._id;
    try {
        const cart = await Cart.findOne({
            $and: [{ userId: userId }, { status: 0 }],
        });

        if (cart) {
            Cart.findOne({ _id: cart._id })
                .populate("products.productId")
                .exec((err, data) => {
                    return res.json(data);
                });
        } else {
            return res.json([]);
        }
    } catch (error) {
        res.json({
            status: "error",
            message: "something went wrong! check your sent data",
        }).status(500);
    }
};

module.exports.addCart = async (req, res) => {
    if (typeof req.body == undefined) {
        res.json({
            status: "error",
            message: "data is undefined",
        });
    } else {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            try {
                const newCart = new Cart({
                    userId: ObjectID(req.user._id),
                    date: Date.now(),
                    products: [
                        {
                            productId: ObjectID(req.body.product.id),
                            quantity: req.body.product.quantity,
                        },
                    ],
                });

                await newCart.save();

                Cart.findOne({ _id: newCart._id })
                    .populate("products.productId")
                    .exec((err, data) => {
                        return res.json(data);
                    });
            } catch (error) {
                res.json({
                    status: "error",
                    message: "something went wrong! check your sent data",
                }).status(500);
            }
        } else {
            try {
                const nowProduct = cart.products;
                let gotIt = false;
                let removeIt = false;
                let indexToRemove = 0;
                nowProduct.forEach((product, index) => {
                    if (
                        product.productId.equals(req.body.product.id) &&
                        req.body.product.quantity !== 0
                    ) {
                        product.quantity = req.body.product.quantity;
                        gotIt = true;
                    } else if (req.body.product.quantity === 0) {
                        removeIt = true;
                        indexToRemove = index;
                        gotIt = true;
                    }
                });
                if (removeIt) {
                    nowProduct.splice(indexToRemove, 1);
                }

                if (!gotIt) {
                    nowProduct.push({
                        productId: ObjectID(req.body.product.id),
                        quantity: req.body.product.quantity,
                    });
                    cart.status = 0;
                }

                cart.products = nowProduct;
                if (!nowProduct.length) {
                    cart.status = 1;
                }

                await cart.save();
                Cart.findOne({ _id: cart._id })
                    .populate("products.productId")
                    .exec((err, data) => {
                        return res.json(data);
                    });
            } catch (error) {
                res.json({
                    status: "error",
                    message: "something went wrong! check your sent data",
                }).status(500);
            }
        }
    }
};

module.exports.deleteCart = (req, res) => {
    if (req.params.id == null) {
        res.json({
            status: "error",
            message: "cart id should be provided",
        });
    } else {
        Cart.findOne({ id: req.params.id })
            .select("-_id -products._id")
            .then((cart) => {
                res.json(cart);
            })
            .catch((err) => console.log(err));
    }
};
