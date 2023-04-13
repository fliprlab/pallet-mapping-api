import { Model, model, Schema } from "mongoose";
import { TShipments } from "./type/shipments";
import { ObjectId } from "mongodb";

const schema = new Schema<TShipments>(
  {
    palletId: { type: String, required: true },
    items: Array,
    gridId: ObjectId,
    latestStatus: {
      type: String,
      enum: ["created", "asign-grid", "out", "cancelled"],
      required: true,
    },
    shipmentDestination: { type: String, required: true },
    shipmentOrigin: { type: String, required: true },
    shipmentId: { type: String, required: true, unique: true },
    status: Array,
  },
  {
    timestamps: true,
  }
);

const ShipmentsModel: Model<TShipments> = model("shipments", schema);

export default ShipmentsModel;
