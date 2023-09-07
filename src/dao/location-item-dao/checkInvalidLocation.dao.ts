import { regExpLocation } from "../../constants";

import LocationModel from "../../models/LocationModel";

export const checkInvalidLocationDao = (destination: string) => {
  return LocationModel.findOne({
    location: regExpLocation(destination),
  }).exec();
};
