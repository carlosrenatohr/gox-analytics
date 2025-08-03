import { z } from "zod";

export const eventSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
  event: z.string(),
  timestamp: z.coerce.date(),
  metadata: z.object({
    url: z.string(),
    referrer: z.string(),
  }),
});

export const externalEventSchema = z.object({
  url: z.string(),
  referrer: z.string(),
  device: z.string(),
  browser: z.string(),
});

