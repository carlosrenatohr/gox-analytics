// -- Global Constants --
// Min and max age for events in days
export const MIN_AGE_IN_DAYS = 90;
export const MAX_AGE_IN_DAYS = 5;
export const MIN_AGE_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * MIN_AGE_IN_DAYS;
export const MAX_AGE_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * MAX_AGE_IN_DAYS;

// Default values for pagination
export const DEFAULT_PAGE_LIMIT_VALUE = 10;
export const DEFAULT_PAGE_NUMBER_VALUE = 1;

// Default date values for stats
export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD"; 

// JWT constants
export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

// Rate limit constants
export const TOKEN_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const TOKEN_LIMIT_MAX = 5; // max 5 reqs every 15 minutes

// Event seeder constants
export const TOTAL_EVENTS = 100000; // 100,000 events
export const BATCH_SIZE = 10000; // 10,000 events per batch

// Cache constants
export const CACHE_TTL = 120; // 120 seconds
