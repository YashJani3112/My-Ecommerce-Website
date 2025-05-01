import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log('Decoded JWT:', decoded); // Log decoded token

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                console.error(`User not found in DB for ID: ${decoded.id}`);
                res.status(401);
                throw new Error('User not found, authentication failed');
            }

            next();
        } catch (error) {
            console.error('Auth error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});


const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not Authorized as an admin');
    }
};

// ✅ Correctly export both `protect` and `admin`
export { protect, admin };
