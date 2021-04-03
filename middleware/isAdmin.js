module.exports = (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    } else {
        res.status(401).json({
            message: "You are not authorized perform this action",
        });
    }
};
