import { Model, model, Schema } from "mongoose";
import { TEvents } from "./type/events";
import { ObjectId } from "mongodb";

const schema = new Schema<TEvents>(
  {
    eventName: { type: String, required: true },
    createdBy: ObjectId,
    eventDomain: { type: String, required: true },
    relatedTo: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

const EventsModel: Model<TEvents> = model("events", schema);

export default EventsModel;
