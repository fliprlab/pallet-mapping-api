import LocationItemsModel from "../../models/LocationItemsModel";

export const checkDuplicateLocationItemDao = async (itemId: string) => {
  return await LocationItemsModel.findOne({
    itemId: itemId,
    status: { $eq: "created" },
  }).exec();
};
