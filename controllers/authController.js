// filepath: c:\Users\srinu\TechLearn-backend\controllers\authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                isAdmin:req.body.isAdmin,
            });

            const savedUser = await user.save();
            const accessToken = generateToken({ id: savedUser._id, name: savedUser.name });
            res.json({
                accessToken,
                user: {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    isAdmin: savedUser.isAdmin,
                }
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

      login: async (req, res) => {
         try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid credentials' 
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid credentials' 
            });
        }

        const accessToken = generateToken({
            id: user._id,
            name: user.name,
            isAdmin: user.isAdmin
        });

        return res.status(200).json({
            success: true,
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false,
            error: 'Login failed' 
        });
    }
}};


function generateToken(user) {
    return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "15m" });
}

module.exports = authController;