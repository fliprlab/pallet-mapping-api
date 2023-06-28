import { Model, model, Schema } from "mongoose";
import { TLocationItems } from "./type/location-items";

const schema = new Schema<TLocationItems>(
  {
    itemId: { type: String, required: true, unique: true },
    destination: { type: String, required: true },
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
