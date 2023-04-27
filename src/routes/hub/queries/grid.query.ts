import { Router } from "express";
import { gridController } from "../../../controllers/grid.controller";

export const gridQueries = (router: Router) => {
  router.get("/get-grids", gridController.getGrids);
};
