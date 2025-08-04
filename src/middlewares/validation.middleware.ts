import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export const validateEvent = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const arrEvents = Array.isArray(body) ? body : [body];

      const result = schema.safeParse(arrEvents);
      if (!result.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid events payload", errors: result.error.issues.map((e) => e.message) });
      }
      next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.issues.map((issue: any) => ({
                message: `${issue.path.join('.')} is ${issue.message}`,
            }))
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
      next(error);
    }
  };
};