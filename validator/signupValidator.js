module.exports = (req, res, next) => {
    //Validate post creation rule from schema
    req.check("email", "Email required").notEmpty();
    req.check("email", "Provide a valid email id").isEmail();
    req.check("username").notEmpty();
    req.check("password", "Password required").notEmpty();
    req.check("password", "Password must be 8-20 characters long").isLength({
        min: 8,
        max: 20,
    });

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
