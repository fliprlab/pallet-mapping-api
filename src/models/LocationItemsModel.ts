import { Model, model, Schema } from "mongoose";
import { TLocationItems } from "./type/location-items";
import { ObjectId } from "mongodb";

const schema = new Schema<TLocationItems>(
  {
    itemId: { type: String, required: true },
    destination: { type: String, required: true },
    origin: String,
    virtualId: String,
    pallet: {
      _id: ObjectId,
      name: String,
      destination: String,
    },
    status: {
      type: String,
      enum: ["created", "put away", "picked up", "dispatched", "cancelled"],
      default: "created",
    },
    shipmentId: ObjectId,
    lpst: String,
    zone: String,
    hub: { _id: ObjectId, origin: String },
    cancelled: {
      type: Boolean,
      default: false,
    },
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
