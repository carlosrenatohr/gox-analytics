import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export const validateEvent = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid request body", errors: result.error.issues.map((issue) => issue.message) });
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