import { FilterQuery } from "mongoose";
import LocationItemsModel from "../../models/LocationItemsModel";
import { TLocationItems } from "../../models/type/location-items";

interface IUpdate {
  where: FilterQuery<TLocationItems>;
  data: Partial<TLocationItems>;
  upsert?: boolean;
}

export const updateLocationItemDao = async (fields: IUpdate) => {
  const { data, where, upsert = false } = fields;
  return await LocationItemsModel.updateOne(
    { ...where },
    { $set: data },
    { upsert: upsert }
  ).exec();
};
