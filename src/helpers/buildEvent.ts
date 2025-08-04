import { ExternalEventPayload } from "../types/event.type";
import { IEvent } from "../models/event.model";

// Helper to build an event object from an event payload. By default, it builds an external event.
export const buildEvent = (event: ExternalEventPayload, type: string = "external"): IEvent => {

    return {
        userId: `${type}`,
        sessionId: `${type}_${Date.now()}`,
        event: `${type}_visit`,
        timestamp: new Date(),
        metadata: {
            url: event.url,
            referrer: event.referrer,
            device: event.device,
            browser: event.browser,
        },
    };
};
