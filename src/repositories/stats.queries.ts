import { getPaginationPipeline } from "../helpers/paginate";
import EventModel from "../models/event.model";
import { GroupingBy, OrderingBy, PageViewsStatsQueryParams } from "../types/stats.types";

// -- Gets page views stats --
export const getPageViewsStatsQuery = async function (params: PageViewsStatsQueryParams) {
    try {
    // Build order by field and group by field
    const orderByField: OrderingBy = params.orderBy ?? 'count';
    const orderByDirection: 1 | -1 = (params.orderDirection === 'asc') ? 1 : -1;
    const groupByField: GroupingBy = params.groupBy ?? 'url';
    
    // Build pipeline
    const match: any = {
        timestamp: {
            $gte: new Date(params.fromDate),
            $lte: new Date(params.toDate),
        },
    };
    
    const pipeline = [
        { $match: match },
        { $group: { _id: `$metadata.${groupByField}`, count: { $sum: 1 } } },
        { $project: { [groupByField]: "$_id", count: 1, _id: 0 } },
        { $sort: { [orderByField]: orderByDirection } },
        ...getPaginationPipeline(params.page, params.limit),
    ];
        return await EventModel.aggregate(pipeline);
    } catch (err) {
        console.error(`|Error in getPageViewsStatsQuery: ${err}`);
        throw err;
    }
}

// -- Gets user activity stats --
export const getUserActivityStatsQuery = async function (userId: string, params: PageViewsStatsQueryParams) {
    try {
    // Validate and clean userId
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error('Invalid userId: must be a non-empty string');
    }
    
    // Build order by field
    const orderByField: OrderingBy = params.orderBy ?? 'sessionId';
    const orderByDirection: 1 | -1 = (params.orderDirection === 'desc') ? -1 : 1;
    
    const match: any = {
        userId: userId.trim(),
        timestamp: {
            $gte: new Date(params.fromDate),
            $lte: new Date(params.toDate),
        },
    };
    
    // Build pipeline
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
        { $sort: { [orderByField]: orderByDirection as 1 | -1 } },
        ...getPaginationPipeline(params.page, params.limit),
    ];
        return await EventModel.aggregate(pipeline);
    } catch (err) {
        console.error(`|Error in getUserActivityStatsQuery: ${err}`);
        throw err;
    }
}

