import { Router } from "express";
import { hubAdminController } from "../../../controllers/hubAdmin.controller";
import { checkUniqueUsername } from "../../../middleware/hub-admin/hub-admin.middleware";

export const hubAdminQueries = (router: Router) => {
  router.post(
    "/hub-admin/create",
    checkUniqueUsername,
    hubAdminController.create
  );
  router.get("/hub-admin/get", hubAdminController.get);
  router.post("/hub-admin/update-status", hubAdminController.updateStatus);
  router.post("/hub-admin/update-password", hubAdminController.updatePassword);
};
