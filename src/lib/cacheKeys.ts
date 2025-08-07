import { PageViewsStatsQueryParams } from "../types/stats.types";

// -- Builds a cache key for the given params and endpoint --
export function buildCacheKey(params: PageViewsStatsQueryParams, endpoint: string, userId?: string): string {
    // Convert Date objects to timestamps
    const fromTs = params.fromDate ? 
        (params.fromDate instanceof Date ? params.fromDate.getTime() : new Date(params.fromDate).getTime()) : 0;
    const toTs = params.toDate ? 
        (params.toDate instanceof Date ? params.toDate.getTime() : new Date(params.toDate).getTime()) : 0;
    
    // Build the cache key
    // Ensure all values are properly stringified and handle undefined/null
    const limit = params.limit || 0;
    const page = params.page || 0;
    const orderBy = params.orderBy || 'count';
    const orderDirection = params.orderDirection || 'desc';
    const groupBy = params.groupBy || 'url';
    
    const userIdPart = userId ? `:${userId}` : '';
    
    const cacheKey = `${endpoint}:${fromTs}:${toTs}:${limit}:${page}:${orderBy}:${orderDirection}:${groupBy}${userIdPart}`;
    return cacheKey;
}
