const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    stock: Number,
    image: String,
    category: {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
});

module.exports = mongoose.model("product", productSchema);
