import EventModel from "../models/event.model";
import { getPaginationPipeline } from "../helpers/paginate";
import { GroupingBy, OrderingBy, OrderingDirection } from "../types/stats.types";

// Top Pages
export const getTopPagesService = async (
    fromDate: string,
    toDate: string,
    limit: number,
    page: number,
    orderBy: OrderingBy,
    orderDirection: OrderingDirection
) => {
    const match: any = {
        timestamp: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
        },
    };
    const orderByField: OrderingBy = orderBy ?? 'count';
    const orderByDirection: 1 | -1 = (orderDirection === 'desc') ? -1 : 1;
    const pipeline = [
        { $match: match },
        { $group: { _id: '$metadata.url', count: { $sum: 1 } } },
        { $project: { url: '$_id', count: 1, _id: 0 } },
        { $sort: { [orderByField]: orderByDirection } },
        ...getPaginationPipeline(page, limit),
    ];
    return EventModel.aggregate(pipeline);
};

// Top Users
export const getTopUsersService = async (
    fromDate: string,
    toDate: string,
    limit: number,
    page: number,
    orderBy: OrderingBy,
    orderDirection: OrderingDirection
) => {
    const match: any = {
        timestamp: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
        },
    };
    const orderByField: OrderingBy = orderBy ?? 'count';
    const orderByDirection: 1 | -1 = (orderDirection === 'desc') ? -1 : 1;
    const pipeline = [
        { $match: match },
        { $group: { _id: '$userId', count: { $sum: 1 } } },
        { $project: { userId: '$_id', count: 1, _id: 0 } },
        { $sort: { [orderByField]: orderByDirection } },
        ...getPaginationPipeline(page, limit),
    ];
    return EventModel.aggregate(pipeline);
};