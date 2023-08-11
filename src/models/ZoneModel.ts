import { Model, model, Schema } from "mongoose";
import { TZone } from "./type/TZone";

const schema = new Schema<TZone>(
  {
    zone: { type: String, required: true, unique: true },
    createdBy: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  this.zone = this.zone.toUpperCase();
  next();
});

const ZoneModel: Model<TZone> = model("zones", schema);

export default ZoneModel;
