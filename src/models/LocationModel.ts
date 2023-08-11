import { Model, model, Schema } from "mongoose";
import { TLocation } from "./type/location";

const schema = new Schema<TLocation>(
  {
    location: { type: String, required: true, unique: true },
    createdBy: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  this.location = this.location.toUpperCase();
  next();
});

const LocationModel: Model<TLocation> = model("locations", schema);

export default LocationModel;
