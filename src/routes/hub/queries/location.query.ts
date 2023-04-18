import { Router } from "express";
import { locationController } from "../../../controllers/location.controller";

export const locationsQueries = (router: Router) => {
  router.get("/get-locations", locationController.get);
};
