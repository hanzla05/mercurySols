import bcrypt from 'bcrypt';
import User from '../models/user.mjs'; // Adjust the path as per your project structure

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ status: false, message: "Incorrect password" });
        }

        // If everything is correct, return the user data (you may want to omit sensitive data like passwords)
        res.status(200).json({ status: true, message: "Login successful", user: user });
    } catch (error) {
        res.status(400).send(error);
    }
}

export default login;
