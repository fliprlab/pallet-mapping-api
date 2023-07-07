import { Model, model, Schema } from "mongoose";
import { TLocationItems } from "./type/location-items";
import { ObjectId } from "mongodb";

const schema = new Schema<TLocationItems>(
  {
    itemId: { type: String, required: true, unique: true },
    destination: { type: String, required: true },
    origin: String,
    pallet: {
      _id: ObjectId,
      name: String,
    },
    status: {
      type: String,
      enum: ["created", "out", "cancelled", "picked up"],
    },
    shipmentId: ObjectId,
  },
  {
    timestamps: true,
  }
);

const LocationItemsModel: Model<TLocationItems> = model(
  "location-items",
  schema
);

export default LocationItemsModel;
