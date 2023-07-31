import { Router } from "express";
import { locationItemsController } from "../../../controllers/location-items.controller";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (_req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const uploadFile = multer({ storage: storage });

export const locationItemsQueries = (router: Router) => {
  router.post(
    "/location-items/create",
    uploadFile.single("uploadFile"),
    locationItemsController.uploadLocationItemV2
  );
  router.get("/location-items", locationItemsController.getLocationItems);
};
