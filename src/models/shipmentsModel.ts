import { Model, model, Schema } from "mongoose";
import { TShipments } from "./type/shipments";

const schema = new Schema<TShipments>(
  {
    palletId: { type: String, required: true },
    items: Array,
    gridId: String,
    latestStatus: {
      type: String,
      enum: ["created", "asign-grid", "out", "cancelled"],
      required: true,
    },
    palletOrigin: { type: String, required: true },
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
