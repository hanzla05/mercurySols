// const bcrypt = require('bcrypt'); // Uncomment if you plan to use bcrypt for password hashing

import User from "../models/user.mjs";
import bcrypt from 'bcrypt';

async function register(req, res) {
    try {
        const { name, email, phone, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: "Email already in use" });
        }

        // Hash the password before saving (uncomment if using bcrypt)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, phone, password :hashedPassword });
        await newUser.save();
        res.status(201).json({ status: true, message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(400).send(error);
    }
}

export default register
