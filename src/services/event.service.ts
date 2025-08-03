import EventModel, { IEvent } from "../models/event.model";

export const createEvents = async (events: IEvent[]): Promise<IEvent[]> => {
  const result = await EventModel.insertMany(events);
  console.log(`> Inserted ${result.length} event(s) successfully.`);

  return result;
};
