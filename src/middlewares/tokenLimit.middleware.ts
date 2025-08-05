import rateLimit from 'express-rate-limit';

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 requests every 15 minutes
    message: 'Too many token requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});
