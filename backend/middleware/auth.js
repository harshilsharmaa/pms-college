const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            console.log("No token found")
            return res.status(401).json({
                message: "Please login first",
                success: false
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.isHod = async (req, res, next) => {
    try {
        
        const user = await User.findById(req.user._id);
        if(user.isHod===false){
            return res.status(401).json({
                message: "You are not authorized to access this page",
                success: false
            })
        }

        next();

    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }

}