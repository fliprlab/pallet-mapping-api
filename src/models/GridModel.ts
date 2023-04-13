import { Model, model, Schema } from "mongoose";
import { TGrid } from "./type/grid";
import { ObjectId } from "mongodb";

const schema = new Schema<TGrid>(
  {
    gridId: { type: String, required: true, unique: true },
    palletId: Object,
    hub: { type: Object, required: true },
    status: {
      type: String,
      enum: ["occupied", "unoccupied"],
      default: "unoccupied",
    },
    time: Date,
    createdBy: { type: ObjectId, required: true },
    updatedBy: { type: Object, required: true },
    destination: String,
  },
  {
    timestamps: true,
  }
);

const GridModel: Model<TGrid> = model("grids", schema);

export default GridModel;
