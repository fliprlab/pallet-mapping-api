import { FilterQuery } from "mongoose";
import LocationItemsModel from "../../models/LocationItemsModel";
import { TLocationItems } from "../../models/type/location-items";

interface IUpdate {
  where: FilterQuery<TLocationItems>;
  data: Partial<TLocationItems>;
  upsert?: boolean;
  unsetData?: ObjInterFace;
}

export const updateLocationItemDao = async (fields: IUpdate) => {
  const { data, where, upsert = false, unsetData } = fields;
  return await LocationItemsModel.updateOne(
    { ...where },
    { $set: data, $unset: unsetData || {} },
    { upsert: upsert }
  ).exec();
};
