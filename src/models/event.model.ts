import { Schema, Document, model } from "mongoose";

// -- Interfaces --
export interface IEvent {
  userId: string;
  sessionId: string;
  event: string;
  timestamp: Date;
  metadata: {
    url: string;
    referrer: string;
    device?: string;
    browser?: string;
  };
}

export interface IEventDocument extends IEvent, Document {}

// -- Schema definition --
const eventSchema = new Schema<IEventDocument>(
  {
    userId: { type: String, required: true, index: true },
    sessionId: { type: String, required: true },
    event: { type: String, required: true },
    timestamp: { type: Date, required: true, index: true },
    metadata: {
      url: { type: String },
      referrer: { type: String },
      device: { type: String, required: false },
      browser: { type: String, required: false },
    },
  },
  {
    timestamps: false,
  }
);

const EventModel = model<IEventDocument>("Event", eventSchema);
export default EventModel;
