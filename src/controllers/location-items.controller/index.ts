import { scanItem } from "./ScanItems";
import { getLocationItems } from "./getLocationItems";
import { mapPalletItem } from "./mapPalletItem";
import { uploadLocationItem } from "./uploadLocationItem";

export const locationItemsController = {
  uploadLocationItem,
  getLocationItems,
  scanItem,
  mapPalletItem,
};
