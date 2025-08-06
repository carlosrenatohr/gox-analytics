import EventModel from "../models/event.model";
import { getPaginationPipeline } from "../helpers/paginate";
import { GroupingBy, OrderingBy, OrderingDirection } from "../types/stats.types";
import { getOrSetCache } from "../lib/cacheUtil";

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
    // Cache key generated from params
    const fromKey = new Date(fromDate).getTime();
    const toKey = new Date(toDate).getTime();
    const cacheKey = `stats:page-views:${fromKey}:${toKey}:${limit}:${page}:${orderBy}:${orderDirection}:${groupBy}`;
    console.log(`[getPageViewsStatsService] Cache key: ${cacheKey}`);
    return getOrSetCache(cacheKey, async () => {
        console.log(`[getPageViewsStatsService] Cache miss for key: ${cacheKey}`);
        console.log(`[getPageViewsStatsService] Params: ${JSON.stringify({ fromDate, toDate, limit, page, orderBy, orderDirection, groupBy })}`);
        console.log(`[getPageViewsStatsService] Order by: ${orderBy}`);
        console.log(`[getPageViewsStatsService] Order direction: ${orderDirection}`);
        console.log(`[getPageViewsStatsService] Group by: ${groupBy}`);

        try {
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
                { $sort: { [orderByField]: orderByDirection } },
                ...getPaginationPipeline(page, limit),
            ];
            console.log(`[getPageViewsStatsService] Pipeline: ${JSON.stringify(pipeline)}`);
            const result = await EventModel.aggregate(pipeline).exec();
            return result;
        } catch (error) {
            console.error(`[getPageViewsStatsService] Error: ${error}`);
            throw error;
        }
    });
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