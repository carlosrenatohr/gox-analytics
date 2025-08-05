import { Request, Response, NextFunction } from 'express';
import { getTodayRange, parseDate, getEndOfDay } from '../helpers/date.utils';
import { StatusCodes } from 'http-status-codes';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

// -- Middleware to validate stats query params --
export const validateStatsQuery = (req: Request, res: Response, next: NextFunction) => {
    const { from, to, limit, page } = req.query;

    // Set default dates if not provided
    const today = getTodayRange();
    if (!from) {
        req.query.from = today.from.toISOString();
    }
    if (!to) {
        req.query.to = today.to.toISOString();
    }

    // Parse and validate dates using the helper functions
    let fromDate: Date, toDate: Date;
    
    try {
        fromDate = parseDate(req.query.from as string);
        toDate = getEndOfDay(req.query.to as string); // Use end of day for 'to' date
        
        // Update the query with properly formatted dates
        req.query.from = fromDate.toISOString();
        req.query.to = toDate.toISOString();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
            error: 'Invalid date format. Use ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)' 
        });
    }
    
    // Check if from is before to
    if (fromDate > toDate) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
            error: 'From date must be before to date' 
        });
    }

    // Set default limit if not provided or invalid
    if (!limit || isNaN(parseInt(limit as string)) || parseInt(limit as string) <= 0) {
        req.query.limit = DEFAULT_LIMIT.toString();
    }

    // Set default page if not provided or invalid
    if (!page || isNaN(parseInt(page as string)) || parseInt(page as string) <= 0) {
        req.query.page = DEFAULT_PAGE.toString();
    }

    next();
};