import { FilterQuery } from "mongoose";
import PalletModel from "../../models/PalletModel";
import { TPallet } from "../../models/type/pallet";

interface IUpdate {
  where: FilterQuery<TPallet>;
  data: Partial<TPallet>;
  upsert?: boolean;
}

export const updatePalletDao = async (fields: IUpdate) => {
  const { data, where, upsert = false } = fields;
  return await PalletModel.updateOne(
    { ...where },
    { $set: data },
    { upsert: upsert }
  ).exec();
};
