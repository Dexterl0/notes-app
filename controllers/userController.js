const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return res.status(400).json({
            error: "Account with that email already exists"
        });
    }

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({
            error: "All fields must be entered"
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            error: "Passwords do not match"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email: email,
        password: hashedPassword,
        tags: ["Travel", "Personal", "Life", "Work", "Untagged"]
    });

    const savedUser = await user.save();

    const token = jwt.sign({
        user: savedUser._id
    }, process.env.JWT_SECRET);

    res.status(200).cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).json({
        message: "Signup Successful"
    });

};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "All fields must be entered"
        });
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
        return res.status(400).json({
            error: "Incorrect email or password"
        });
    }

    const correctPassword = await bcrypt.compare(password, existingUser.password);

    if (!correctPassword) {
        return res.status(400).json({
            error: "Incorrect email or password"
        });
    }

    const token = jwt.sign({
        user: existingUser._id
    }, process.env.JWT_SECRET);

    res.status(200).cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).json({
        message: "Login Successful"
    });

};

exports.logout = (req, res) => {
    res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).json({
        message: "Logged out Successfully"
    });

};

exports.loggedIn = (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                loggedIn: false,
                userId: ""
            });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);

        res.status(200).json({
            loggedIn: true,
            userId: user
        });

    } catch (err) {
        res.status(400).json({
            loggedIn: false,
            userId: ""
        });
    }
};

exports.getTags = async (req, res) => {
    const { userId } = req.params;

    try {
        const foundUser = await User.findById(userId);

        res.status(200).json({
            tags: foundUser.tags
        });

    } catch (err) {
        res.status(400).json({
            error: "Could not get tags"
        });
    }
};