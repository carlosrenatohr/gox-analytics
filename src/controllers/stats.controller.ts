import { Request, Response } from "express";
import { StatsRequest } from "../types/express";
import { StatusCodes } from "http-status-codes";
import { getPageViewsStatsService } from "../services/stats.service";

// GET /api/v1/stats/page-views
export const getPageViewsStats = async (req: Request, res: Response) => {
    try {
        const { fromDate, toDate, limit, page, orderBy, orderDirection, groupBy } = (req as StatsRequest).statsQuery;
        const results = await getPageViewsStatsService(fromDate, toDate, limit, page, orderBy, orderDirection, groupBy);
        console.log('> Results:', results);
        res.status(StatusCodes.OK).json({ total: results.length, data: results });
    } catch (err) {
        console.error('|Error in getPageViewsStats:', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching page views stats" });
    }
};