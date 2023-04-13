import GridModel from "../../models/GridModel";
import { TGrid } from "../../models/type/grid";

export const updateGrid = async (id: string, data: Partial<TGrid>) => {
  return await GridModel.updateOne({ _id: id }, { $set: data }).exec();
};
