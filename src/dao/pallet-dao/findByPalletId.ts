import PalletModel from "../../models/PalletModel";

export const findByPalletId = async (palletId: string) => {
  return await PalletModel.findOne({ palletId }).exec();
};
