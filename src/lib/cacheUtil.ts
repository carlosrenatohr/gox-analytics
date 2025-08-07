
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
import { CACHE_TTL } from '../config/constants';
dotenv.config();

// -- Redis client --
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// -- Type for the function that will be cached --
type CacheFn<T> = () => Promise<T> | T;

// -- Builds a cache key for the given params and endpoint --
import { PageViewsStatsQueryParams } from "../types/stats.types";

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

// -- Gets or sets a cache value --
export async function getOrSetCache<T>(
    key: string,
    fallbackFn: CacheFn<T>,
    ttlSeconds: number = CACHE_TTL
): Promise<T> {
    if (!redis || !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        return fallbackFn();
    }
    
    try {
        const cached = await redis.get(key);

        // If there is a cached value
        if (cached !== null && cached !== undefined && cached !== 'null' && cached !== 'undefined' && cached !== '') {
            try {
                // If it is a string, parse it (we save it as a string)
                if (typeof cached === 'string') {
                    return JSON.parse(cached);
                }
                return cached as T;
            } catch (err) {
                console.error(`|Error in getOrSetCache: Cache parse error for key=${key}:`, err);
            }
        }
        
        // If there is no valid cached value, execute fallback
        const value = await fallbackFn();
        if (value !== undefined && value !== null) {
            await redis.setex(key, ttlSeconds, JSON.stringify(value));
        }
        return value;
    } catch (err) {
        console.error(`|Error in getOrSetCache: Redis unavailable, using fallback for key=${key}:`, err);
        return fallbackFn();
    }
}
