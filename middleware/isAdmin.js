const User = require('../model/user')
const Decoder = require("jwt-decode")

module.exports = async (req, res, next) => {
    const decodedToken = Decoder(req.headers?.token, { header: false });

    console.log("The header: ", decodedToken.user._id);
    if (decodedToken.user._id) {
        console.log(req);
        next();
    } else {
        res.status(401).json({
            message: "You are not authorized perform this action",
        });
    }
};
