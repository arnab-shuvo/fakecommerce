const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Product = require("./product");
const User = require("./user");

const cartSchema = new schema({
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

module.exports = mongoose.model("cart", cartSchema);
