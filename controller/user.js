const User = require("../model/user");

module.exports.getAllUser = (req, res) => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort == "desc" ? -1 : 1;

    User.find()
        .select(["-_id"])
        .limit(limit)
        .sort({
            id: sort,
        })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => console.log(err));
};

module.exports.getUser = (req, res) => {
    const _id = req.params.id;

    User.findOne({
        _id,
    })
        .select(["-_id"])
        .then((user) => {
            res.json(user);
        })
        .catch((err) => console.log(err));
};

module.exports.signup = async (req, res) => {
    const ifExist = await User.findOne({ email: req.body.email });
    if (ifExist) {
        return res.status(400).json({ message: "Email already exist" });
    }
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: {
            city: req.body.address ? req.body.address.city : "N/A",
            street: req.body.address ? req.body.street : "N/A",
            number: req.body.number ? req.body.number : 0,
            zipcode: req.body.zipcode ? req.body.zipcode : 0,
            geolocation: {
                lat: req.body.geolocation ? req.body.geolocation.lat : 0,
                long: req.body.geolocation ? req.body.geolocation.lat : 0,
            },
        },
        phone: req.body.phone ? req.body.phone : 0,
        role: "user",
    });
    await user.save();
    const newUser = await User.findOne({ email: user.email }).select([
        "-_id",
        "-password",
    ]);
    res.json(newUser);
};

module.exports.editUser = (req, res) => {
    if (typeof req.body == undefined || req.params.id == null) {
        res.json({
            status: "error",
            message: "something went wrong! check your sent data",
        });
    } else {
        res.json({
            id: req.params.id,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            name: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            },
            address: {
                city: req.body.address.city,
                street: req.body.address.street,
                number: req.body.number,
                zipcode: req.body.zipcode,
                geolocation: {
                    lat: req.body.geolocation.lat,
                    long: req.body.geolocation.long,
                },
            },
            phone: req.body.phone,
        });
    }
};

module.exports.deleteUser = (req, res) => {
    if (req.params.id == null) {
        res.json({
            status: "error",
            message: "cart id should be provided",
        });
    } else {
        User.findOne({ id: req.params.id })
            .select(["-_id"])
            .then((user) => {
                res.json(user);
            })
            .catch((err) => console.log(err));
    }
};
