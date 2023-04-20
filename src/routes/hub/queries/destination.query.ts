import { Router } from "express";
import { gridController } from "../../../controllers/grid.controller";

export const destinationQueries = (router: Router) => {
  router.get("/get-all-destinations", gridController.getAllDestinations);
};
