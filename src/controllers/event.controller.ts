import { Request, Response } from "express";
import { createEvents } from "../services/event.service";
import EventModel, { IEvent } from "../models/event.model";

// POST /api/v1/track-event
export const postTrackEvent = async (req: Request, res: Response) => {
  const body = req.body;
  const events = Array.isArray(body) ? body : [body];

  if (events.length === 0) {
    return res.status(400).json({ message: "No events to process" });
  }

  try {
    const total = await createEvents(events);
    console.log(total);
    res.status(200).json({ message: "Events processed successfully", count: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing events" });
  }
};

export const trackExternalEvent = async (req: Request, res: Response) => {
  const { url, referrer, device, browser } = req.query;

  if (!url || !referrer || !device || !browser) {
    console.log(`URL is ${url}`);
    console.log(`Referrer is ${referrer}`);
    console.log(`Device is ${device}`);
    console.log(`Browser is ${browser}`);
    return res.status(400).json({ message: "Missing query parameters." });
  }

  const event: IEvent = {
    userId: "external",
    sessionId: `ext_${Date.now()}`,
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
    console.log(`External visit logged from ${referrer} → ${url} [${device}]`);
    res.status(201).json({ message: "External event tracked." });
  } catch (err) {
    console.error("Error tracking external event:", err);
    res.status(500).json({ message: "Failed to track external event." });
  }
};
