
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
import { CACHE_TTL } from '../config/constants';
dotenv.config();

// Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Type for the function that will be cached
type CacheFn<T> = () => Promise<T> | T;

// Function to get or set cache
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
                // If parsing fails, ignore cache and query to base (for security)
                console.warn(`[getOrSetCache] Cache parse error for key=${key}:`, err);
            }
        }
        // If there is no valid cached value, execute fallback
        const value = await fallbackFn();
        if (value !== undefined && value !== null) {
            await redis.setex(key, ttlSeconds, JSON.stringify(value));
        }
        return value;
    } catch (err) {
        console.warn(`[getOrSetCache] Redis unavailable, using fallback for key=${key}:`, err);
        return fallbackFn();
    }
}
