import { addLocationItems } from "./addLocationItems.dao";
import { checkDuplicateLocationItemDao } from "./checkDuplicateLocationItem.dao";
import { checkInvalidLocationDao } from "./checkInvalidLocation.dao";
import { createLocationItemDao } from "./createLocation.dao";
import { getLastLocationItem } from "./getLastLocationItem";
import { getLocationItemsDao } from "./getLocations.dao";
import { resetZoneItems } from "./resetZoneItems";
import { updateLocationItemDao } from "./updateLocationItem.dao";

export const locationItemsDao = {
  addLocationItems,
  updateLocationItemDao,
  getLocationItemsDao,
  createLocationItemDao,
  checkDuplicateLocationItemDao,
  checkInvalidLocationDao,
  resetZoneItems,
  getLastLocationItem,
};
