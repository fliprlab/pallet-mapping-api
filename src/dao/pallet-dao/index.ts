import { addPallet } from "./addPallet";
import { findByPalletId } from "./findByPalletId";
import { getPalletsDao } from "./getPallets.dao";
import { updatePallet } from "./updatePallet";

export const palletDao = {
  addPallet,
  findByPalletId,
  updatePallet,
  getPalletsDao,
};
