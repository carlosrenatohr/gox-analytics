import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createEvents } from "../services/event.service";
import { IEvent } from "../models/event.model";

// POST /api/v1/event
export const postTrackEvent = async (req: Request, res: Response) => {
  const body = req.body;
  const events = Array.isArray(body) ? body : [body];

  if (events.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "No events to process" });
  }

  try {
    const total = await createEvents(events);
    res.status(StatusCodes.OK).json({ message: "> Events processed successfully", count: total });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "| Error processing events" });
  }
};

// GET /api/v1/event/external
export const trackExternalEvent = async (req: Request, res: Response) => {
  const { url, referrer, device, browser } = req.query;

  if (!url || !referrer || !device || !browser) {
    console.log(`> URL is ${url}`);
    console.log(`> Referrer is ${referrer}`);
    console.log(`> Device is ${device}`);
    console.log(`> Browser is ${browser}`);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing query parameters." });
  }

  const event: IEvent = {
    userId: "external",
    sessionId: `external_${Date.now()}`,
    event: "external_visit",
    timestamp: new Date(),
    metadata: {
      url: String(url),
      referrer: String(referrer),
      device: String(device),
      browser: String(browser),
    },
  };

  try {
    await createEvents([event]);
    console.log(`> External visit logged from ${referrer} -> ${url} [${device}]`);
    res.status(StatusCodes.CREATED).json({ message: "External event tracked." });
  } catch (err) {
    console.error("| Error tracking external event:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to track external event." });
  }
};
