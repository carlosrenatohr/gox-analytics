import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/auth.utils';
import { StatusCodes } from 'http-status-codes';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing code, please provide a valid token.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
    }
};
