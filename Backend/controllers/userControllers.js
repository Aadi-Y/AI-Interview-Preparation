const bcryptjs = require("bcryptjs");
const User = require("../modals/userModal");
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/authMiddleware")

const generateToken = (userId) => {
    return jwt.sign({ id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" });
}

const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            // profileIamgeUrl
        } = req.body

        if (!name) {
            return res.status(400).json({
                error: true,
                message: "Please give name"
            })
        }

        if (!email) {
            return res.status(400).json({
                error: true,
                message: "Please give email"
            })
        }

        if (!password) {
            return res.status(400).json({
                error: true,
                message: "Please give password"
            })
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: true,
                message: "User aldready exist"
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const registerCredentials = {
            name,
            email,
            password: hashedPassword,
            // profileIamgeUrl
        }
        const user = await User.create(registerCredentials);

        res.status(201).json({
            error: false,
            message: "Registration Successfull",
            user,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                error: true,
                message: "Please give email",
            });
        }

        if (!password) {
            return res.status(400).json({
                error: true,
                message: "Please give password",
            });
        }

        // Use findOne to get a single user object
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                error: true,
                message: "Email does not exist",
            });
        }

        const isPasswordMatch = await bcryptjs.compare(password, userData.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                error: true,
                message: "Incorrect password",
            });
        }

        res.status(200).json({
            error: false,
            message: "Login successful",
            user: userData,
            token: generateToken(userData._id),
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        console.log(req.user);

        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found"
            })
        }

        res.status(200).json({
            error: false,
            message: "User is fetched successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `${error.message}`
        })
    }
}

module.exports = { registerUser, loginUser, getUserProfile };

