import { Router } from "express";
import controllers from "../../../controllers";

const queryPrefix = "/dispatch";

export const dispatchQuery = (router: Router) => {
  router.post(`${queryPrefix}/scan-pallet`, controllers.dispatch.scanPallet);
  router.post(
    `${queryPrefix}/scan-location`,
    controllers.dispatch.scanLocation
  );
};
