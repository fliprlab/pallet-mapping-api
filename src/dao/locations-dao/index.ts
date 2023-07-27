import { addLocation } from "./addLocations";
import { getAllLocations } from "./getAllLocations";
import { getLocationById } from "./getLocationById";
import { getLocationByName } from "./getLocationByName";
import { getLocations } from "./getLocations";

export const locationDao = {
  addLocation,
  getLocations,
  getLocationById,
  getLocationByName,
  getAllLocations,
};
