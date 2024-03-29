import { scanItem } from "./ScanItems";
import { getLocationItems } from "./getLocationItems";
import { getPalletItems } from "./getPalletItems";
import { mapPalletItem } from "./mapPalletItem";
import { uploadLocationItem } from "./uploadLocationItem";

export const locationItemsController = {
  uploadLocationItem,
  getLocationItems,
  scanItem,
  mapPalletItem,
  getPalletItems,
};
