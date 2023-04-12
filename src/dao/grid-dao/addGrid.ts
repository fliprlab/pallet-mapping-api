import GridModel from "../../models/GridModel";
import { TGrid } from "../../models/type/grid";

export const addGrid = async (data: Partial<TGrid>) => {
  const inserted = new GridModel(data);
  return await inserted.save();
};
