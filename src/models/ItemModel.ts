import { Document, Model, model, Schema } from "mongoose";
import { TItem } from "./type/item";
import { ObjectId } from "mongodb";

const ItemModel = new Schema<TItem>(
  {
    itemId: String,
    shipmentId: ObjectId,
    virtualId: String,
    pallet: {
      _id: ObjectId,
      name: String,
    },
    grid: {
      _id: ObjectId,
      name: String,
    },
    status: {
      type: String,
      enum: ["created", "asign-grid", "out", "cancelled"],
      required: true,
      default: "created",
    },
    cancelAt: Date,
    origin: String,
    destination: String,
    lastUpdatedAt: Date,
  },
  {
    timestamps: true,
  }
);

const IteModel: Model<TItem> = model("items", ItemModel);

export default IteModel;
