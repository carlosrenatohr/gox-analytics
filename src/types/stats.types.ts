// -- Events Stats Interfaces --
interface BaseStatsQuery {
    from?: Date;
    to?: Date;
    limit?: string;
    page?: string;
}

interface SecondaryStatsQuery {
    event?: string;
    url?: string;
    device?: string;
    browser?: string;
    sessionId?: string;
}

export interface PageViewsStatsQueryParams extends BaseStatsQuery, SecondaryStatsQuery {}

export interface PageViewsStatsResponse {
    totalViews: number;
    totalUniqueVisitors: number;
    totalTime: number;
    avgTime: number;
    totalPages: number;
}

