import LocationModel from "../../models/LocationModel";

export const getLocationById = async (id: string) => {
  return await LocationModel.findById(id).exec();
};
