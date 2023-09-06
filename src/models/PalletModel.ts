import { Model, model, Schema } from "mongoose";
import { TPallet } from "./type/pallet";
import { ObjectId } from "mongodb";

const schema = new Schema<TPallet>(
  {
    palletId: { type: String, required: true },
    lastUpdatedBy: { type: Object, required: true },
    asignGrid: ObjectId,
    shipmentId: ObjectId,
    status: {
      type: String,
      enum: [
        "pallet-created",
        "pallet-asign-grid",
        "pallet-picked-up",
        "pallet-out",
      ],
      required: true,
    },
    hub: { type: String, required: true },
    destination: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PalletModel: Model<TPallet> = model("pallets", schema);

export default PalletModel;
