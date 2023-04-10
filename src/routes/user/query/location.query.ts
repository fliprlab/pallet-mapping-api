import { Router } from "express";
import { locationController } from "../../../controllers/location.controller";

export const locationQueries = (router: Router) => {
  router.get("/get-locations", locationController.getAppLocation);
};
