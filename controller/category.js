const Category = require("../model/categories");
const ObjectID = require("mongodb").ObjectID;

module.exports.getAllCategories = (req, res) => {
    try {
        Category.find()
            .then((products) => {
                res.json(products);
            })
            .catch((err) => console.log(err));
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.categoryDetail = async (req, res) => {
    if (req.params.id == null || !ObjectID.isValid(req.params.id)) {
        return res.json({
            status: "error",
            message: "Valid Category Id required",
        });
    }
    try {
        const category = await Category.findById(req.params.id);
        return res.status(200).send(category);
    } catch (err) {
        res.status(500).send(err);
    }
};
module.exports.addCategory = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            description: req.body.description ? req.body.description : "",
            image: req.body.image ? req.body.image : "",
        });
        const newCategory = await category.save();
        res.json(newCategory);
    } catch (err) {
        res.status(500).send(err);
    }
};
module.exports.editCategory = async (req, res) => {
    const id = req.params.categoryId;
    const categoryInputValue = req.body;
    try {
        const category = await Category.findOneAndUpdate(
            {
                _id: id,
            },
            categoryInputValue,
            {
                new: true,
                runValidators: true,
                context: "query",
            },
        );
        if (!category) return res.status(404).send("Product Not Found");
        res.send(category);
    } catch (err) {
        res.status(500).send(err);
    }
};
module.exports.deleteCategory = async (req, res) => {
    const id = req.params.categoryId;
    try {
        const category = await Category.findByIdAndDelete({
            _id: id,
        });
        if (!category) return res.status(404).send("Product Not Found");
        res.send({ message: "Deleted Successfully " });
    } catch (err) {
        res.status(500).send(err);
    }
};
