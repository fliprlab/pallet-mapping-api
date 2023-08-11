import { Router } from "express";
import controllers from "../../../controllers";

export const zoneQuery = (router: Router) => {
  router.post("/add-zone", controllers.zone.addZone);
  router.get("/get-zones", controllers.zone.getZones);
};
