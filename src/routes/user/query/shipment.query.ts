import { Router } from "express";
import { shipmentController } from "../../../controllers/shipment.controller";
import { shipmentValidator } from "../../../validators/shipment";

export const shipmentQueries = (router: Router) => {
  router.post(
    "/create-bag",
    shipmentValidator.createShipment,
    shipmentController.createShipment
  );
};
