module.exports = (req, res, next) => {
    //Validate post creation rule from schema
    req.check("email", "Email required").notEmpty();
    req.check("email", "Provide a valid email id").isEmail();
    req.check("password", "Password required").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json(errors);
    }
    next();
};
