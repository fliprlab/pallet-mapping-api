import { Router } from "express";
import { locationItemsController } from "../../../controllers/location-items.controller";
import { checkItemAlreadyPallet } from "../../../middleware/scan-item/checkItemAlreadyPallet";
import { checkPalletExist } from "../../../middleware/scan-item/checkPalletExist";
import { checkPalletItemLocation } from "../../../middleware/scan-item/checkPalletItemLocation";
import { checkPalletAlreadyInUse } from "../../../middleware/scan-item/checkPalletAlreadyinUse";
import { checkValidItemId } from "../../../middleware/scan/checkValidItemId";
import { palletValidator } from "../../../validators/pallet.validator";

export const itemsQueries = (router: Router) => {
  router.post(
    "/scan-items",
    checkValidItemId,
    checkItemAlreadyPallet,
    locationItemsController.scanItem
  );
  router.post(
    "/map-pallet-item",
    palletValidator,
    checkPalletExist,
    checkPalletItemLocation,
    checkPalletAlreadyInUse,
    locationItemsController.mapPalletItem
  );
};
