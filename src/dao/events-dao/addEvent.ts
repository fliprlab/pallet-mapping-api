import EventsModel from "../../models/EventsModel";
import { TEvents } from "../../models/type/events";

export const addEvent = async (data: Partial<TEvents>) => {
  const inserted = new EventsModel(data);
  return await inserted.save();
};
