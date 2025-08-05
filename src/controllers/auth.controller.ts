import { Request, Response } from 'express';
import { generateToken } from '../helpers/auth.utils';

export const getToken = (req: Request, res: Response) => {
    const token = generateToken({ access: 'full' });
    res.json({ token });
};
