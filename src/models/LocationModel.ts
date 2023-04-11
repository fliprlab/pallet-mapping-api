import { Document, Model, model, Schema } from "mongoose";
import { TLocation } from "./type/location";

const schema = new Schema<TLocation>(
  {
    location: { type: String, required: true },
    createdBy: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

const LocationModel: Model<TLocation> = model("locations", schema);

export default LocationModel;
