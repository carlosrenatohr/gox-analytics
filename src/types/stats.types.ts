// -- Events Stats Types --
// Ordering types
export type OrderingDirection = 'asc' | 'desc';
export type OrderingBy = 'count' | 'url' | 'device' | 'browser' | 'sessionId';
export type GroupingBy = 'url' | 'device' | 'browser' | 'sessionId';

// -- Events Stats Interfaces --
// General stats query params
interface BaseStatsQuery {
    from?: Date;
    to?: Date;
    limit?: string;
    page?: string;
    orderBy?: OrderingBy;
    orderDirection?: OrderingDirection;
    groupBy?: GroupingBy;
}

// Secondary stats query params
interface SecondaryStatsQuery {
    event?: string;
    url?: string;
    device?: string;
    browser?: string;
    sessionId?: string;
    userId?: string;
}

// Page views stats query params
export interface PageViewsStatsQueryParams extends BaseStatsQuery, SecondaryStatsQuery {}

