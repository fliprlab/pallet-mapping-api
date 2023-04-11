import PalletModel from "../../models/PalletModel";
import { TPallet } from "../../models/type/pallet";

export const addPallet = async (data: Partial<TPallet>) => {
  // const inserted = new PalletModel(data);
  return await PalletModel.findOneAndUpdate({ palletId: data.palletId }, data, {
    upsert: true,
  }).exec();
};
