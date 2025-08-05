import express from 'express';
import { getToken } from '../controllers/auth.controller';
import { authRateLimiter } from '../middlewares/tokenLimit.middleware';

const router = express.Router();
router.get('/api/v0/token', authRateLimiter, getToken); // Only for testing purposes :p

export default router;
