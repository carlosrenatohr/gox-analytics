import { z } from "zod";
import { eventSchema, externalEventSchema } from "../schemas/event.schema";

// -- Inferred types --
export type EventPayload = z.infer<typeof eventSchema>;
export type ExternalEventPayload = z.infer<typeof externalEventSchema>;