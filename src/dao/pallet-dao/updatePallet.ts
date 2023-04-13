import PalletModel from "../../models/PalletModel";
import { TPallet } from "../../models/type/pallet";

export const updatePallet = async (id: string, data: Partial<TPallet>) => {
  return await PalletModel.updateOne({ _id: id }, { $set: data }).exec();
};
