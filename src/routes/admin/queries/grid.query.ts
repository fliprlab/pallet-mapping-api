import { Router } from "express";
import { gridController } from "../../../controllers/grid.controller";
import { gridValidator } from "../../../validators/grid.validator";
import { checkGridOccupied } from "../../../middleware/grid/checkGridOccupied";

import multer from "multer";
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (_req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const uploadFile = multer({ storage: storage });

export const gridQueries = (router: Router) => {
  router.get("/get-grids", gridController.getGrids);
  router.post("/create-grid", gridValidator, gridController.createGrid);
  router.post(
    "/inactive-grid",
    checkGridOccupied,
    gridController.updateGridStatus
  );

  router.post(
    "/upload-grids",
    uploadFile.single("uploadFile"),
    gridController.uploadGrids
  );
};
