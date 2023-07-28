import LocationModel from "../../models/LocationModel";

export const getAllLocations = async () => {
  return await LocationModel.find();
};
