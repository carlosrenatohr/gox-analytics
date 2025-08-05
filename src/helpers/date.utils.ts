// Helper to get today's date range
export function getTodayRange(): { from: Date; to: Date } {
    const now = new Date();
    const from = new Date(now);
    from.setHours(0, 0, 0, 0);
    const to = new Date(now);
    to.setHours(23, 59, 59, 999);
    return { from, to };
}

// Helper to parse date string to Date object
export function parseDate(dateString: string): Date {
    // If it's already a full ISO string, use it directly
    if (dateString.includes('T') || dateString.includes('Z')) {
        return new Date(dateString);
    }
    
    // If it's just a date (YYYY-MM-DD), convert to start of day
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
}

// Helper to format date for end of day
export function getEndOfDay(dateString: string): Date {
    const date = parseDate(dateString);
    date.setHours(23, 59, 59, 999);
    return date;
}