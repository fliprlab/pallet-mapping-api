import { Router } from "express";
import controllers from "../../../controllers";

export const zoneQuery = (router: Router) => {
  router.get("/add-zone", controllers.zone.addZone);
};
