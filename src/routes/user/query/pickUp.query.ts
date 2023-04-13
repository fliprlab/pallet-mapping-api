import { Router } from "express";
import { pickUpController } from "../../../controllers/pickUp.controller";
import { pickUpValidator } from "../../../validators/pick-up";
import { checkValidPickUpShipmentMiddleware } from "../../../middleware/pick-up/checkValidPickUpShipment.middleware";

export const pickUpQueries = (router: Router) => {
  router.post(
    "/get-pick-up-items",
    pickUpValidator.getItems,
    pickUpController.getPickUpShipments
  );
  router.post(
    "/pick-up-shipment",
    pickUpValidator.pickUpItem,
    checkValidPickUpShipmentMiddleware,
    pickUpController.pickUpShipment
  );
};
