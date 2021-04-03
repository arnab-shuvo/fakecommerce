const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const ExtractJwt = require("passport-jwt").ExtractJwt;

//Create a passport middleware to handle User login
passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                //Find the user associated with the email provided by the user
                const user = await User.findOne({ email });
                if (!user) {
                    //If the user isn't found in the database, return a message
                    return done(null, { message: "User not found" });
                }
                //Validate password and make sure it matches with the corresponding hash stored in the database
                //If the passwords match, it returns a value of true.
                const validate = await user.isValidPassword(password);
                if (!validate) {
                    return done(null, { message: "Wrong Password" });
                }
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, "top_secret", {
                    expiresIn: "2d",
                });
                let date = new Date();
                const expire_at = date.setDate(date.getDate() + 2);
                //Send the user information to the next middleware
                return done(null, {
                    message: "Logged in Successfully",
                    userInfo: {
                        user: user.email,
                        token: token,
                        expire_at: expire_at,
                    },
                });
            } catch (error) {
                return done(error);
            }
        },
    ),
);

// passport.use(
// 	'bearer',
// 	new BearerStrategy(
// 		{
// 			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 			secretOrKey: 'top_secret',
// 		},
// 		function (token, done) {
// 			try {
// 				const user = jwt.verify(token, 'top_secret').user;

// 			} catch (error) {
// 				return done(null, error, { scope: 'read' });
// 			}
// 		},
// 	),
// );

module.exports.isAuth = async (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    if (authorizationHeaader) {
        const token = req.headers.authorization.split("bearer ")[1];
        try {
            result = jwt.verify(token, "top_secret").user;
            req.decoded = result;
            const currentUser = await User.findOne({ _id: result._id });
            if (currentUser) {
                req.user = currentUser;
            }
            next();
        } catch (err) {
            return res.json({ err: err }).status(401);
        }
    } else {
        result = {
            error: `Authentication error. Bearer Token required.`,
            status: 401,
        };
        return res.status(401).send(result);
    }
};
