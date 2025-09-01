import { sendVerificationEmail, welcomeEmail } from "../middlewares/email.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
};

// Controller to create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password & generate verification code
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            vericationCode: verificationCode,
        });
        await newUser.save();

        // Send verification email
        sendVerificationEmail(email, verificationCode);

        res.status(201).json({
            message: "User created successfully, please verify your email",
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//Check if email is already verified
const checkVerified = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.json({ verified: false });
        if (user.isVerified) return res.json({ verified: true });
        res.json({ verified: false });
    } catch (err) {
        res.json({ verified: false });
    }
}

// Email verification
const verifyEmail = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        if (!email || !verificationCode) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        if (user.vericationCode !== verificationCode) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        user.isVerified = true;
        user.vericationCode = undefined;
        await user.save();

        welcomeEmail(email, user.name);

        // Generate JWT after verification
        const token = generateToken(user._id);

        // Set cookie + send response only once
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        }).status(200).json({
            message: "Email verified successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email before logging in" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // never send password in response
        const { password: _, ...userData } = user._doc;

        // Set cookie + send response only once
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        }).status(200).json({
            message: "Login successful",
            user: userData,
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};


// Logout User
const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

export { createUser, checkVerified, verifyEmail, loginUser, logoutUser }
