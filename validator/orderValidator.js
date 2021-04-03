module.exports = (req, res, next) => {
    //Validate post creation rule from schema
    req.check("status", "Status required").notEmpty();
    req.check("status", "Invalid Status supplied ").custom((data) => {
        if ([0, 1, 2].includes(data)) return false;
        return true;
    });
    req.check("status", "Invalid Status supplied ").custom((data) => {
        if (typeof data !== "number") return false;
        return true;
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
