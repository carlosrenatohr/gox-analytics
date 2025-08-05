import { Request, Response } from "express";
import EventModel from "../models/event.model";
import { PageViewsStatsQueryParams } from "../types/stats.types";

// GET /api/v1/stats/page-views
export const getPageViewsStats = async (
    req: Request<{}, {}, {}, PageViewsStatsQueryParams>,
    res: Response
) => {
    try {
        // The middleware already sets defaults for from, to, limit, and page
        const { from, to, limit, page } = req.query;

        // Build match filter - middleware ensures these are valid ISO dates
        // const match: any = {
        //     timestamp: { 
        //         $gte: new Date(from!), 
        //         $lte: new Date(to!) 
        //     }
        // };
        // // if (event) match.event = event;
        // // if (url) match["metadata.url"] = url;
        // // if (device) match["metadata.device"] = device;
        // // if (browser) match["metadata.browser"] = browser;

        // const pipeline = [
        //     { $match: match },
        //     { $group: { _id: "$metadata.url", count: { $sum: 1 } } },
        //     { $sort: { count: -1 as const } },
        //     { $limit: parseInt(limit as string, 10) }
        // ];

        // const results = await EventModel.aggregate(pipeline);
        const results = [1,2,3,4,5,6,7,8,9,10];
        res.json({ data: results });
    } catch (err) {
        res.status(500).json({ message: "Error fetching page views stats" });
    }
};