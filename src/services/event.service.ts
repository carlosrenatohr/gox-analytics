import EventModel, { IEvent } from "../models/event.model";

// -- Services --
// Service to create events in the database
export const createEvents = async (events: IEvent[]): Promise<IEvent[]> => {
  const result = await EventModel.insertMany(events);
  console.log(`> Inserted ${result.length} event(s) successfully.`);

  return result;
};
