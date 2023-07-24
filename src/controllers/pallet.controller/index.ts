import { scanPallet } from "./ScanPallet";
import { checkPalletStatus } from "./checkPalletStatus";
import { getLocationPallets } from "./getLocationPallets";
import { getPalletLocationItems } from "./getPalletLocationItems";
import { getPallets } from "./getPallets";
import { removePalletItem } from "./removePalletItem";
import { scanPalletLocation } from "./scanPalletLocation";

export const palletControlller = {
  checkPalletStatus,
  scanPalletLocation,
  scanPallet,
  getLocationPallets,
  removePalletItem,
  getPalletLocationItems,
  getPallets,
};
