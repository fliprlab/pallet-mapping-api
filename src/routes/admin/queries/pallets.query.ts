import { Router } from "express";
import { palletControlller } from "../../../controllers/pallet.controller";

export const palletsQuery = (router: Router) => {
  router.get("/get-pallets", palletControlller.getPallets);
};
