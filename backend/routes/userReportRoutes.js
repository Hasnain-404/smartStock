import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getOrCreateUserReport, updateUserReport, getUserAccountValue } from '../controllers/userReportControllers.js';

const router = express.Router();

router.get('/get-report', authMiddleware, getOrCreateUserReport);
router.put('/update-report', authMiddleware, updateUserReport);
router.post('/fetch-report', authMiddleware, getUserAccountValue);

export default router;
