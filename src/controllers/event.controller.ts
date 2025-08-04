import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createEvents } from "../services/event.service";
import { buildEvent } from "../helpers/buildEvent";
import { EventPayload, ExternalEventPayload } from "../types/event.type";

// -- POST /api/v1/event
export const postTrackEvent = async (req: Request<{}, {}, EventPayload[]>, res: Response) => {
  const events = req.body;

  if (events.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "No events to process" });
  }

  try {
    const total = await createEvents(events);
    res.status(StatusCodes.OK).json({ message: "> Events processed successfully", count: total.length });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "| Error processing events" });
  }
};

// -- POST /api/v1/event/external
export const postTrackExternalEvent = async (req: Request<{}, {}, ExternalEventPayload[]>, res: Response) => {
  try {
    const body = req.body;
    const events = body.map((e) => buildEvent(e, "external"));
    const createdEvents = await createEvents(events);
    console.log(`> External visit logged from ${createdEvents[0].metadata.referrer} -> ${createdEvents[0].metadata.url} [${createdEvents[0].metadata.device}]`);
    res.status(StatusCodes.CREATED).json({ message: "External event tracked." });
  } catch (err) {
    console.error("| Error tracking external event:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to track external event." });
  }
};
