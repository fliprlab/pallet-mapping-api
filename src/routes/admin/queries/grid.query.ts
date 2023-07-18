import { Router } from "express";
import { gridController } from "../../../controllers/grid.controller";
import { gridValidator } from "../../../validators/grid.validator";
import { checkGridOccupied } from "../../../middleware/grid/checkGridOccupied";

export const gridQueries = (router: Router) => {
  router.get("/get-grids", gridController.getGrids);
  router.post("/create-grid", gridValidator, gridController.createGrid);
  router.post(
    "/inactive-grid",
    checkGridOccupied,
    gridController.updateGridStatus
  );
};
