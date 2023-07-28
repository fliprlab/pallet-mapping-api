import LocationItemsModel from "../../models/LocationItemsModel";
import { TLocationItems } from "../../models/type/location-items";

export const addLocationItems = async (data: Partial<TLocationItems>[]) => {
  return await LocationItemsModel.insertMany(data);
};
