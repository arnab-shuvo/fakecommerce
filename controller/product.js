const Product = require("../model/product");
const Category = require("../model/categories");
const isBase64 = require("is-base64");
const ObjectID = require("mongodb").ObjectID;
const fs = require("fs");

module.exports.getAllProducts = (req, res) => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort == "desc" ? -1 : 1;

    Product.find()
        .select(["-_id"])
        .limit(limit)
        .sort({ id: sort })
        .then((products) => {
            res.json(products);
        })
        .catch((err) => console.log(err));
};

module.exports.getProduct = (req, res) => {
    const id = req.params.id;
    try {
        Product.findById(id)
            .then((product) => {
                res.json(product);
            })
            .catch((err) => console.log(err));
    } catch (error) {
        res.json({
            status: "error",
            message: "something went wrong! check your sent data",
        }).status(500);
    }
};

module.exports.getProductsInCategory = (req, res) => {
    const categoryId = req.params.categoryid;

    Product.find({
        "category._id": categoryId,
    })
        .then((products) => {
            res.json(products);
        })
        .catch((err) => console.log(err));
};

module.exports.addProduct = async (req, res) => {
    if (typeof req.body == undefined) {
        res.json({
            status: "error",
            message: "data is undefined",
        });
    } else {
        try {
            if (!ObjectID.isValid(req.body.category._id)) {
                return res
                    .json({
                        message: "Invalid Category ID",
                    })
                    .status(400);
            }
            const cat = await Category.findOne({
                _id: ObjectID(req.body.category._id),
            });
            if (!cat) {
                return res.json({
                    message: "Category Not Found",
                });
            }

            const base64Info = req.body.image.split(";base64,");
            const imageType = base64Info[0].split("data:image/")[1];
            const base64Data = base64Info[1];

            if (!isBase64(base64Data)) {
                return res.json({
                    message: "Invalid Image Data",
                });
            }

            const uploadPath = process.cwd();
            const localPath = `${uploadPath}/uploads/`;
            const fileName = `${Date.now()}_${Math.floor(
                Math.random() * 300000 + 200000,
            )}.${imageType}`;
            fs.writeFileSync(
                localPath + fileName,
                base64Data,
                "base64",
                function (err, data) {
                    if (err) {
                        throw new Error(err);
                    }
                },
            );
            const product = new Product({
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                image: `/files/${fileName}`,
                stock: req.body.stock ? req.body.stock : 0,
                category: {
                    _id: cat._id,
                    name: cat.name,
                },
            });
            const newProduct = await product.save();
            res.json(newProduct);
        } catch (error) {
            res.json({
                status: "error",
                message: "something went wrong! check your sent data",
            }).status(500);
        }
    }
};

module.exports.editProduct = async (req, res) => {
    const productInputValue = req.body;
    if (typeof req.body == undefined || req.params.id == null) {
        return res.json({
            status: "error",
            message: "something went wrong! check your sent data",
        });
    } else {
        try {
            const base64Info = req.body.image.split(";base64,");
            const imageType = base64Info[0].split("data:image/")[1];
            const base64Data = base64Info[1];
            if (!isBase64(base64Data)) {
                return res.json({
                    message: "Invalid Image Data",
                });
            }
            const uploadPath = process.cwd();
            const localPath = `${uploadPath}/uploads/`;
            const fileName = `${Date.now()}_${Math.floor(
                Math.random() * 300000 + 200000,
            )}.${imageType}`;
            fs.writeFileSync(
                localPath + fileName,
                base64Data,
                "base64",
                function (err, data) {
                    if (err) {
                        throw new Error(err);
                    }
                },
            );

            await Product.updateOne(
                { _id: req.params.id },
                { $set: { ...productInputValue, image: `/files/${fileName}` } },
            );
            const updatedProduct = await Product.findById({
                _id: req.params.id,
            });
            return res.send(updatedProduct);
        } catch (error) {
            console.log(error);
            return res
                .json({
                    status: "error",
                    message: "something went wrong! check your sent data",
                    error: error,
                })
                .status(500);
        }
    }
};

module.exports.deleteProduct = (req, res) => {
    if (req.params.id == null) {
        res.json({
            status: "error",
            message: "Product id should be provided",
        });
    } else {
        Product.remove({ _id: ObjectID(req.params.id) }, (err, result) => {
            if (err) return console.log(err);
            res.json({ message: "Product deleted" });
        });
    }
};


exports.sendImageData=(req,res)=>{
    const uploadPath = process.cwd();
    const localPath = `${uploadPath}/uploads/`;
    if(req.params.file_name==null){
        res.json({
            status: "error",
            message: "Product id should be provided",
        });
    }else{
        const fileName=req.params.file_name;
        fs.readFile(localPath + fileName, function(err, data) {
            if (err) throw err;
          
            res.set('Content-Type', 'image/png')
            res.send(data)
        })
        
    }
}