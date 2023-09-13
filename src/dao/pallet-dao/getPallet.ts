import PalletModel from "../../models/PalletModel";

export const findByObjectId = async (palletObjectId: string) => {
  return await PalletModel.findById(palletObjectId).exec();
};
