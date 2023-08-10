import { Model, model, Schema } from "mongoose";
import { TZone } from "./type/TZone";

const schema = new Schema<TZone>(
  {
    zone: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const ZoneModel: Model<TZone> = model("zones", schema);

export default ZoneModel;
