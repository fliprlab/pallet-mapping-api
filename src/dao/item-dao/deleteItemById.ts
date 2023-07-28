import { ObjectId } from "mongodb";
import LocationItemsModel from "../../models/LocationItemsModel";

export const deleteItemById = async (_id: ObjectId) => {
  return await LocationItemsModel.findByIdAndDelete(_id);
};
