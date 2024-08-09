const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '30d' });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '30d' });
            res.json({ user, token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, authUser };
