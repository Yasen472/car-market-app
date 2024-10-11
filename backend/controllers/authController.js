const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');

// Register User
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send userId in response
        res.status(200).json({ userId: savedUser._id, message: 'Registration successful.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.error('Login error: User not found');
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            console.error('Login error: Incorrect password');
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Send userId in response
        res.status(200).json({ userId: existingUser._id, message: 'Login successful.' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
