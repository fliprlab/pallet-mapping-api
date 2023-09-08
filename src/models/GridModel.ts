import { Model, model, Schema } from "mongoose";
import { TGrid } from "./type/grid";

const schema = new Schema<TGrid>(
  {
    gridId: { type: String, required: true },
    palletId: Object,
    hub: { type: Object, required: true },
    status: {
      type: String,
      enum: ["occupied", "unoccupied"],
      default: "unoccupied",
    },
    time: Date,
    destination: String,
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const GridModel: Model<TGrid> = model("grids", schema);

export default GridModel;
