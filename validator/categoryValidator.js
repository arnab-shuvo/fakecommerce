module.exports = (req, res, next) => {
    //Validate post creation rule from schema
    req.check("name", "Name required").notEmpty();

    const errors = req.validationErrors();
    let errorMessage = {};
    if (errors) {
        errors.forEach((err) => {
            if (!errorMessage[err.param]) {
                errorMessage[err.param] = err.msg;
            }
        });
        return res.status(400).json(errorMessage);
    }
    next();
};
