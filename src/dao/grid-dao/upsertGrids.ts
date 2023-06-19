import GridModel from "../../models/GridModel";
import { TGrid } from "../../models/type/grid";

export const upsertGrids = async (data: Partial<TGrid>) => {
  return GridModel.updateOne(
    { gridId: data.gridId, hub: data.hub },
    { $set: data },
    { upsert: true }
  ).exec();
};
