import { Model, model, Schema } from "mongoose";
import { TLocationItems } from "./type/location-items";
import { ObjectId } from "mongodb";
import validators from "../validators";

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
      enum: [
        "created",
        "primary sort",
        "secondary sort",
        "put away",
        "picked up",
        "dispatched",
        "cancelled",
      ],
      default: "created",
    },
    shipmentId: ObjectId,
    lpst: String,
    zone: String,
    hub: { _id: ObjectId, origin: String },
    gridId: {
      type: String,
      default: "",
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: String,
      enum: ["primary", "secondary"],
      default: "primary",
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("findOneAndUpdate", function (next) {
  const pallet = this.get("pallet");
  if (pallet) {
    const destination = pallet.destination;
    if (
      validators.zone.valideZoneId(destination) ||
      validators.zone.valideZone(destination)
    ) {
      this.set({
        sort: "primary",
        status: "primary sort",
      });
    } else {
      this.set({
        sort: "secondary",
        status: "secondary sort",
      });
    }
  }
  next();
});

const LocationItemsModel: Model<TLocationItems> = model(
  "location-items",
  schema
);

export default LocationItemsModel;
