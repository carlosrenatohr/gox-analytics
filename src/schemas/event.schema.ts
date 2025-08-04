import { z } from "zod";

const MAX_AGE_IN_DAYS = 30;
const MAX_AGE_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * MAX_AGE_IN_DAYS;

// Shared subschema for event metadata
const metadataSchema = z.object({
  url: z.string().refine(
    (val) => val.startsWith('/'),
    { message: 'URL must be a path URL' }
  ),
  referrer: z.string().refine(
    (val) => val.startsWith('/'),
    { message: 'Referrer must be a string' }
  ),
  device: z.string().optional(),
  browser: z.string().optional(),
});

// Shared subschema for timestamp
export const timestampSchema = z
  .coerce
  .date()
  .refine(
    (date) => date.getTime() > Date.now() - MAX_AGE_IN_MILLISECONDS, {
      message: `Datetime must be within the last ${MAX_AGE_IN_DAYS} days`,
    })
  .refine(
    (date) => date <= new Date(), {
      message: "Datetime must not be in the future",
    });

// Event schema
export const eventSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
  event: z.string(),
  timestamp: timestampSchema,
  metadata: metadataSchema,
});

export const eventArraySchema = z.array(eventSchema);
export const externalEventArraySchema = z.array(eventSchema);

