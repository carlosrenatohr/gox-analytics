import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getUTCStartOfDay, getUTCEndOfDay } from '../helpers/date.utils';
import { StatsRequest } from '../types/express';
import { DEFAULT_PAGE_LIMIT_VALUE, DEFAULT_PAGE_NUMBER_VALUE } from '../config/constants';
import { GroupingBy, OrderingBy, OrderingDirection } from '../types/stats.types';

// -- Middleware to validate stats query params --
export const validateStatsQuery = (req: Request, res: Response, next: NextFunction) => {
    let { from, to, limit, page, orderBy, orderDirection, groupBy } = req.query;

    // Set today as default dates if not provided
    const now = new Date();
    const fromDate = from ? new Date(from as string) : getUTCStartOfDay(now);
    const toDate = to ? new Date(to as string) : getUTCEndOfDay(now);

    // Validate dates are valid
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid dates" });
    }

    // Validate from date is before to date
    if (fromDate > toDate) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "From date must be before To date" });
    }

    // Set default limit and page if not sent or invalid
    (req as StatsRequest).statsQuery = {
        fromDate,
        toDate,
        limit: parseInt(limit as string) || DEFAULT_PAGE_LIMIT_VALUE,
        page: parseInt(page as string) || DEFAULT_PAGE_NUMBER_VALUE,
        orderBy: orderBy as OrderingBy || 'url',
        orderDirection: orderDirection as OrderingDirection || 'desc',
        groupBy: groupBy as GroupingBy || 'url'
    };

    console.log('> Final query params:', (req as StatsRequest).statsQuery);

    next();
};
