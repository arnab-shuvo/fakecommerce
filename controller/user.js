const User = require("../model/user");
const ObjectID = require("mongodb").ObjectID;

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

module.exports.addUser = async (req, res) => {
    const ifExist = await User.findOne({ email: req.body.email });
    if (ifExist) {
        return res.status(400).json({ message: "Email already exist" });
    }
    try {
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
            role: req.body.role ? req.body.role : "user",
        });
        await user.save();
        const newUser = await User.findOne({ email: user.email }).select([
            "-_id",
            "-password",
        ]);
        res.json(newUser);
    } catch (error) {
        return res.status(500).send(err);
    }
};

module.exports.editUser = async (req, res) => {
    if (typeof req.body == undefined || req.params.id == null) {
        res.json({
            status: "error",
            message: "something went wrong! check your sent data",
        });
    } else {
        try {
            if (!ObjectID.isValid(req.params.id)) {
                return res.status(404).json({ message: "Not a valid UserId" });
            }
            const editableUser = await User.findById(req.params.id);
            if (!editableUser) {
                return res.status(404).json({ message: "No User Found" });
            }

            await User.findByIdAndUpdate(req.params.id, req.body);
            const responseUser = await User.findById(req.params.id).select(
                "-password",
            );
            return res.json(responseUser);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
};

module.exports.deleteUser = async (req, res) => {
    if (req.params.id == null) {
        res.json({
            status: "error",
            message: "user id should be provided",
        });
    } else {
        try {
            if (!ObjectID.isValid(req.params.id)) {
                return res.status(404).json({ message: "Not a valid UserId" });
            }
            const editableUser = await User.findById(req.params.id);
            if (!editableUser) {
                return res.status(404).json({ message: "No User Found" });
            }

            await User.deleteOne({ _id: ObjectID(req.params.id) });
            return res
                .status(301)
                .json({ message: "User Deleted Successfully" });
        } catch (err) {
            console.log(err, "==err");
            return res.status(500).send({ err: "err" });
        }
    }
};
