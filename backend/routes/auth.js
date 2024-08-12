const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateTokenAndSetCookie = require("../utils/generateToken");

//Route 1: Create new Account using POST: "api/auth/signup". Login not required

router.post(
    "/signup", [
        body("fullName", "Full name must be at least 3 characters long").isLength({
            min: 3,
        }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be at least 6 characters").isLength({
            min: 6,
        }),
        body("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
        body("gender", "Enter a valid Gender").isIn(["male", "female"]),
    ],
    async(req, res) => {
        try {
            // Validate the request body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Check if user already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                console.log("User already exists", user);
                return res.status(400).json({ error: "User already exists" });
            }

            // Password hashing using bcrypt
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Create new user
            user = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: hashedPassword, // Use hashedPassword instead of req.body.password
                gender: req.body.gender,
            });
            await user.save();

            // Generate JWT Token
            generateTokenAndSetCookie(
                user._id,
                user.fullName,
                user.email,
                res,
                (token) => {
                    console.log("Generated token: ", token);
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

// Route 2: Login using POST: "api/auth/login". Login not required
router.post(
    "/login", [
        body("email", "Enter a valid Email").isEmail(),
        body("password", "Enter a valid Password").exists(),
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Destructure email and password
            const { email, password } = req.body;

            // Check if email is valid
            const foundUserByEmail = await User.findOne({ email: email });

            // Check if user exists and password matches
            if (!foundUserByEmail || !(await bcrypt.compare(password, foundUserByEmail.password))) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            // Generate JWT token
            generateTokenAndSetCookie(
                foundUserByEmail._id,
                foundUserByEmail.fullName,
                foundUserByEmail.email,
                res,
                (token) => {
                    console.log(token);
                    // Send JWT token in response
                    res.json({ success: true, token });
                }
            );
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    }
);

// Route 3: Logout using POST: "api/auth/logout". Login not required
router.post("/logout", [], async(req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});



module.exports = router;