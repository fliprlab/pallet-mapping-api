import { regExpLocation } from "../../constants";

import LocationModel from "../../models/LocationModel";

export const checkInvalidLocationDao = async (destination: string) => {
  return await LocationModel.findOne({
    location: regExpLocation(destination),
  }).exec();
};
