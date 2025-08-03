import { z } from "zod";
import { eventSchema } from "../schemas/event.schema";

export type EventPayload = z.infer<typeof eventSchema>;
// export type ExternalQueryParams = z.infer<typeof externalEventSchema>;