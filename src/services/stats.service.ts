import EventModel from "../models/event.model";
import { getPaginationPipeline } from "../helpers/paginate";

// Service to get page views stats
export const getPageViewsStatsService = async (
    fromDate: string,
    toDate: string,
    limit: number,
    page: number
) => {
    const match: any = {
        timestamp: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
        },
    };

    const pipeline = [
        { $match: match },
        { $group: { _id: "$metadata.url", count: { $sum: 1 } } },
        { $project: { url: "$_id", count: 1, _id: 0 } },
        { $sort: { count: -1 as 1 | -1 } },
        ...getPaginationPipeline(page, limit),
    ];

    return EventModel.aggregate(pipeline);
};
