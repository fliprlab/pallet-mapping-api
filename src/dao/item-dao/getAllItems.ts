import LocationItemsModel from "../../models/LocationItemsModel";

export const getAllItems = async () => {
  return await LocationItemsModel.find();
};
