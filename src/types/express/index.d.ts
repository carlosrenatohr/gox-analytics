import { Request } from "express";
import { BaseStatsQuery } from "../stats.types";

// export interface StatsQuery {
//     fromDate: Date;
//     toDate: Date;
//     limit: number;
//     page: number;
// }

export interface StatsRequest extends Request {
    statsQuery: BaseStatsQuery;
}