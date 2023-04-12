import { Router } from "express";
import { gridController } from "../../../controllers/grid.controller";
import { gridValidator } from "../../../validators/grid.validator";

export const gridQueries = (router: Router) => {
  router.get("/get-grids", gridController.getGrids);
  router.post("/create-grid", gridValidator, gridController.createGrid);
};
