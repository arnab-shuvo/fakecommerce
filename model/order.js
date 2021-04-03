const mongoose = require("mongoose");
const schema = mongoose.Schema;
const User = require("./user");
const Product = require("./product");

const orderSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    products: [
        {
            productId: {
                type: schema.Types.ObjectId,
                ref: Product,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("order", orderSchema);
