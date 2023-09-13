import { addPallet } from "./addPallet";
import { findByPalletId } from "./findByPalletId";
import { findByObjectId } from "./getPallet";
import { getPalletsDao } from "./getPallets.dao";
import { updatePallet } from "./updatePallet";
import { updatePalletStatus } from "./updatePalletStatus";

export const palletDao = {
  addPallet,
  findByPalletId,
  updatePallet,
  getPalletsDao,
  findByObjectId,
  updatePalletStatus,
};
