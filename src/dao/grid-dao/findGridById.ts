import { ObjectId } from "mongodb";
import GridModel from "../../models/GridModel";

export const findGridById = async (id: string | ObjectId) => {
  return GridModel.findById(id).exec();
};
