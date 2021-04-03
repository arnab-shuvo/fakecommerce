module.exports = (req, res, next) => {
    //Validate post creation rule from schema
    req.check("title", "Write a title").notEmpty();
    req.check("image", "Image Required").notEmpty();
    req.check("price", "Price Required").notEmpty();
    req.check("price", "Price must be NUmber").custom((data) => {
        console.log(typeof data, "==");
        if (typeof data !== "number") return false;
        return true;
    });
    req.check("category._id", "Category ID Required").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({
            error: firstError,
        });
    }
    next();
};
