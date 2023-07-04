import { scanPallet } from "./ScanPallet";
import { checkPalletStatus } from "./checkPalletStatus";
import { getLocationPallets } from "./getLocationPallets";
import { removePalletItem } from "./removePalletItem";
import { scanPalletLocation } from "./scanPalletLocation";

export const palletControlller = {
  checkPalletStatus,
  scanPalletLocation,
  scanPallet,
  getLocationPallets,
  removePalletItem,
};
