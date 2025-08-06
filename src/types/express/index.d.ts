import { Request } from "express";
import { BaseStatsQuery, SecondaryStatsQuery } from "../stats.types";

export interface StatsRequest extends Request {
    statsQuery: BaseStatsQuery;
    statsOptions?: SecondaryStatsQuery;
}