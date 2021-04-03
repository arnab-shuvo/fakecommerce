const Order = require("../model/order");
const Cart = require("../model/cart");
const ObjectID = require("mongodb").ObjectID;

module.exports.getAllOrder = async (req, res) => {
    try {
        Order.find()
            .populate("products.productId")
            .populate("userId", { password: 0, _id: 0 })
            .exec((err, data) => {
                return res.json(data);
            });
    } catch (err) {
        res.status(500).send(err);
    }
};
module.exports.createOrder = async (req, res) => {
    const userId = req.user._id;
    try {
        const cart = await Cart.findOne({
            $and: [{ userId: userId }, { status: 0 }],
        });
        if (!cart) {
            return res.status(404).json({ message: "No Cart Found" });
        }

        cart.status = 1;
        await cart.save();
        const order = new Order({
            userId: ObjectID(userId),
            date: Date.now(),
            products: cart.products,
            status: 0,
        });
        await order.save();
        return res.json(order);
    } catch (err) {
        return res.status(500).send(err);
    }
};
module.exports.updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    console.log(orderId, "==orderId");
    const status = req.body.status;
    try {
        const currentOrder = await Order.findById(orderId);
        console.log(currentOrder, "===currentOrder");
        if (!currentOrder) {
            return res.status(404).json({ message: "No Order Found" });
        }
        currentOrder.status = status;
        await currentOrder.save();
        return res.json(currentOrder);
    } catch (err) {
        return res.status(500).send(err);
    }
};
