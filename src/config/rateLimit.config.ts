import rateLimit from 'express-rate-limit';
import { TOKEN_LIMIT_MAX, TOKEN_LIMIT_WINDOW_MS } from './constants';

export const authRateLimiter = rateLimit({
    windowMs: TOKEN_LIMIT_WINDOW_MS, // 15 minutes
    max: TOKEN_LIMIT_MAX, // max 5 requests every 15 minutes
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});