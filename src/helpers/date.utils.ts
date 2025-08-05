// Helper to get today's date range
export function getTodayRange(): { from: Date; to: Date } {
    const now = new Date();
    const from = new Date(now);
    from.setHours(0, 0, 0, 0);
    const to = new Date(now);
    to.setHours(23, 59, 59, 999);
    return { from, to };
}

export function getUTCStartOfDay(date: Date): Date {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
}

export function getUTCEndOfDay(date: Date): Date {
    const d = new Date(date);
    d.setUTCHours(23, 59, 59, 999);
    return d;
}
