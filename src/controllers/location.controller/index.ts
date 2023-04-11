import { createLocation } from "./createLocation";
import { findLocations } from "./findLocations";
import { getLocationsForApp } from "./getLocationsForApp";

export const locationController = {
  create: createLocation,
  get: findLocations,
  getAppLocation: getLocationsForApp,
};
