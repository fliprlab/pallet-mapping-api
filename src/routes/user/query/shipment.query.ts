import { Router } from "express";
import { shipmentController } from "../../../controllers/shipment.controller";
import { shipmentValidator } from "../../../validators/shipment";
import { createShipmentsMiddleware } from "../../../middleware/shipments";

export const shipmentQueries = (router: Router) => {
  router.post(
    "/create-bag",
    shipmentValidator.createShipment,
    createShipmentsMiddleware,
    shipmentController.createShipment
  );
};
