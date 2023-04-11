import { Router } from "express";
import { locationController } from "../../../controllers/location.controller";
import { locationValidator } from "../../../validators/location.validator";

export const locationsQueries = (router: Router) => {
  router.post("/add-location", locationValidator, locationController.create);
  router.get("/get-locations", locationController.get);
};
