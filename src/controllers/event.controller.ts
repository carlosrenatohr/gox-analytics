import { Request, Response } from "express";
import EventModel from "../models/event.model";

export const postEvents = async (req: Request, res: Response) => {
  const body = req.body;
  const events = Array.isArray(body) ? body : [body];

  if (events.length === 0) {
    return res.status(400).json({ message: "No events to process" });
  }

  try {
    const result = await EventModel.insertMany(events);
    console.log(result);
    res.status(200).json({ message: "Events processed successfully", count: result.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing events" });
  }
};
