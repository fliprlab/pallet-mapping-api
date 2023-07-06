import { Router } from "express";
import { palletControlller } from "../../../controllers/pallet.controller";
import { palletValidator } from "../../../validators/pallet.validator";
import { locationItemsController } from "../../../controllers/location-items.controller";

export const palletQueries = (router: Router) => {
  router.post(
    "/check-pallet-status",
    palletValidator,
    palletControlller.checkPalletStatus
  );

  router.post("/pallet/scan-location", palletControlller.scanPalletLocation);
  router.post("/pallet/scan", palletControlller.scanPallet);
  router.post("/location-pallets", palletControlller.getLocationPallets);
  router.post("/pallets/items", locationItemsController.getPalletItems);
  router.post("/pallets/remove-item", palletControlller.removePalletItem);
  router.post("/dispatch-items/get", palletControlller.getPalletLocationItems);
};
