import express from 'express';
import { getToken } from '../controllers/auth.controller';
import { authRateLimiter } from '../middlewares/tokenLimit.middleware';

const router = express.Router();
/**
 * @swagger
 * /api/v1/token:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get token
 *     description: Get a token for testing purposes ONLY. Safety stayed at home. 
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 expiresIn:
 *                   type: number
 *                   description: Time in seconds until the token expires
 *                   example: 3600
 *                 userId:
 *                   type: string
 *                   description: User ID associated with the token
 */
router.get('/api/v1/token', authRateLimiter, getToken); // Only for testing purposes :p

export default router;
