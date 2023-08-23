import { ObjectId } from "mongodb";
import LocationItemsModel from "../../models/LocationItemsModel";

export const getLastLocationItem = async (itemId: string | ObjectId) => {
  return LocationItemsModel.findOne({ itemId: itemId })
    .sort({ _id: -1 }) // Sort by _id in descending order
    .exec();
};
