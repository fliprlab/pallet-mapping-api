import { Router } from "express";
import { locationItemsController } from "../../../controllers/location-items.controller";

export const locationItemsQueries = (router: Router) => {
  router.post(
    "/location-items/create",
    locationItemsController.uploadLocationItem
  );
  router.get("/location-items", locationItemsController.getLocationItems);
};
