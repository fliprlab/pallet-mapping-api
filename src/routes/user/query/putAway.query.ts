import { Router } from "express";
import { putAwayCardController } from "../../../controllers/putAwayCard.controller";
import { putAwayValidator } from "../../../validators/put-away";
import { putAwayCheckValidPalletMiddleware } from "../../../middleware/put-away/putAwayCheckValidPallet";

export const putAwayQueries = (router: Router) => {
  router.post(
    "/grid-check-valid-pallet",
    putAwayValidator.checkValidPallet,
    putAwayCardController.checkValidPallet
  );
  router.post(
    "/mapped-grid",
    putAwayValidator.asignGrid,
    putAwayCheckValidPalletMiddleware,
    putAwayCardController.asignGrid
  );
};
