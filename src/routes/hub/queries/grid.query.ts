import { Router } from "express";
import { gridController } from "../../../controllers/grid.controller";
import { hubGridAddValidator } from "../../../validators/grid.validator";

export const gridQueries = (router: Router) => {
  router.get("/get-grids", gridController.getGrids);
  router.post(
    "/add-grids",
    hubGridAddValidator,
    gridController.addMultipleGrids
  );
};
