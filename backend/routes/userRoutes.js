import express from 'express';
const router = express.Router();
import { createUser, checkVerified, verifyEmail, loginUser, logoutUser } from '../controllers/userControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// Public Routes
router.post('/create-user', createUser);       // anyone can create account
router.post('/check-verified', checkVerified); // check if email is verified
router.post('/verify-email', verifyEmail);     // anyone can verify email
router.post('/login', loginUser);              // anyone can login
router.post('/logout', logoutUser);            // anyone can logout

// Protected Routes
router.get('/check', authMiddleware, (req, res) => {
    res.json({ success: true, user: req.user });
});

export default router;
