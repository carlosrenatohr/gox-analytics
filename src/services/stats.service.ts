import EventModel from "../models/event.model";
import { getPaginationPipeline } from "../helpers/paginate";
import { GroupingBy, OrderingBy, OrderingDirection } from "../types/stats.types";

// Service to get page views stats
export const getPageViewsStatsService = async (
    fromDate: string,
    toDate: string,
    limit: number,
    page: number,
    orderBy: OrderingBy,
    orderDirection: OrderingDirection,
    groupBy: GroupingBy
) => {
    // Build pipeline
    const orderByField: OrderingBy = orderBy ?? 'count';
    const orderByDirection: 1 | -1 = (orderDirection === 'asc') ? 1 : -1;
    const groupByField: GroupingBy = groupBy ?? 'url';

    const match: any = {
        timestamp: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
        },
    };

    const pipeline = [
        { $match: match },
        { $group: { _id: `$metadata.${groupByField}`, count: { $sum: 1 } } },
        { $project: { [groupByField]: "$_id", count: 1, _id: 0 } },
        {
            $sort: {
                [orderByField === 'count' ? 'count' : groupByField]: orderByDirection, 
                timestamp: -1
            }
        },
        ...getPaginationPipeline(page, limit),
    ];

    return EventModel.aggregate(pipeline);
};

// Service to get user activity stats
export const getUserActivityStatsService = async (userId: string, fromDate: string, toDate: string, limit: number, page: number, orderBy: OrderingBy, orderDirection: OrderingDirection) => {
    const orderByField: OrderingBy = orderBy ?? 'sessionId';
    const orderByDirection: 1 | -1 = (orderDirection === 'desc') ? -1 : 1;
    const match: any = {
        userId,
        timestamp: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
        },
    };

    const pipeline = [
        { $match: match },
        {
            $group: {
                _id: '$sessionId',
                events: {
                    $push: {
                        event: '$event',
                        timestamp: '$timestamp',
                        metadata: '$metadata',
                    }
                }
            }
        },
        { $project: { sessionId: '$_id', events: 1, _id: 0 } },
        { $sort: { [orderByField]: orderByDirection } },
        ...getPaginationPipeline(page, limit),
    ];

    return EventModel.aggregate(pipeline);
};