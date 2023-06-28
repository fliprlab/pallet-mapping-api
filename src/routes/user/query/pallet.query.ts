import { Router } from "express";
import { palletControlller } from "../../../controllers/pallet.controller";
import { palletValidator } from "../../../validators/pallet.validator";

export const palletQueries = (router: Router) => {
  router.post(
    "/check-pallet-status",
    palletValidator,
    palletControlller.checkPalletStatus
  );

  router.post("/pallet/scan-location", palletControlller.scanPalletLocation);
};
