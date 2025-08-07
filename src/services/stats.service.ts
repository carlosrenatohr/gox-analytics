import { PageViewsStatsQueryParams } from "../types/stats.types";
import { getOrSetCache } from "../lib/cacheUtil";
import { buildCacheKey } from "../lib/cacheKeys";
import { getPageViewsStatsQuery, getUserActivityStatsQuery } from "../repositories/stats.queries";

// -- Service to get page views stats --
export const getPageViewsStatsService = async (params: PageViewsStatsQueryParams) => {
    try {
        const cacheKey = buildCacheKey(params, 'page-views');
        return getOrSetCache(cacheKey, async () => {
            const results = await getPageViewsStatsQuery(params);
            return results;
        });
        } catch (err) {
            console.error(`|Error in getPageViewsStatsService: ${err}`);
            throw err;
        }
    };

// -- Service to get user activity stats --
export const getUserActivityStatsService = async (userId: string, params: PageViewsStatsQueryParams) => {
    try {
        const cacheKey = buildCacheKey(params, 'user-activity', userId);
        return getOrSetCache(cacheKey, async () => {
            const results = await getUserActivityStatsQuery(userId, params);
            return results;
        });
        } catch (err) {
            console.error(`|Error in getUserActivityStatsService: ${err}`);
            throw err;
        }
    };