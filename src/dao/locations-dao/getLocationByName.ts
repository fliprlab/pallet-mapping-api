import { regExpLocation } from "../../constants";
import LocationModel from "../../models/LocationModel";

export const getLocationByName = async (locationName: string) => {
  return await LocationModel.findOne({
    location: regExpLocation(locationName),
  }).exec();
};
