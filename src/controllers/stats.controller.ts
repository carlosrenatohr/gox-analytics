import { Request, Response } from "express";
import { StatsRequest } from "../types/express";
import { StatusCodes } from "http-status-codes";
import { getPageViewsStatsService, getUserActivityStatsService } from "../services/stats.service";
import { getTopPagesService, getTopUsersService } from "../services/topStats.service";

// -- GET /api/v1/stats/page-views --
export const getPageViewsStats = async (req: Request, res: Response) => {
    try {
        const { fromDate, toDate, limit, page, orderBy, orderDirection, groupBy } = (req as StatsRequest).statsQuery;
        const results = await getPageViewsStatsService(fromDate, toDate, limit, page, orderBy, orderDirection, groupBy);
        console.log('> Results:', results);
        res.status(StatusCodes.OK).json({ page, limit, total: results.length, data: results });
    } catch (err) {
        console.error('|Error in getPageViewsStats:', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching page views stats" });
    }
};

// -- GET /api/v1/stats/user-activity --
export const getUserActivityStats = async (req: Request, res: Response) => { 
    try {
        const { userId } = (req as StatsRequest).statsOptions;
        const { fromDate, toDate, limit, page, orderBy, orderDirection } = (req as StatsRequest).statsQuery;
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is required" });
        }
        const data = await getUserActivityStatsService(userId, fromDate, toDate, limit, page, orderBy, orderDirection);
        res.status(StatusCodes.OK).json({ page, limit, total: data.length, data });
    } catch (err) {
        console.error('|Error in getUserActivityStats:', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching user activity stats" });
    }
};

// -- GET /api/v1/stats/top-pages --
export const getTopPages = async (req: Request, res: Response) => {
    try {
        const { fromDate, toDate, limit, page, orderBy, orderDirection } = (req as StatsRequest).statsQuery;
        const results = await getTopPagesService(fromDate, toDate, limit, page, orderBy, orderDirection);
        res.status(StatusCodes.OK).json({ page, limit, total: results.length, data: results });
    } catch (err) {
        console.error('|Error in getTopPages:', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching top pages" });
    }
};

// -- GET /api/v1/stats/top-users --
export const getTopUsers = async (req: Request, res: Response) => {
    try {
        const { fromDate, toDate, limit, page, orderBy, orderDirection } = (req as StatsRequest).statsQuery;
        const results = await getTopUsersService(fromDate, toDate, limit, page, orderBy, orderDirection);
        res.status(StatusCodes.OK).json({ page, limit, total: results.length, data: results });
    } catch (err) {
        console.error('|Error in getTopUsers:', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching top users" });
    }
};
