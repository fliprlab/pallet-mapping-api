import { addLocationItems } from "./addLocationItems.dao";
import { getLocationItemsDao } from "./getLocations.dao";
import { updateLocationItemDao } from "./updateLocationItem.dao";

export const locationItemsDao = {
  addLocationItems,
  updateLocationItemDao,
  getLocationItemsDao,
};
