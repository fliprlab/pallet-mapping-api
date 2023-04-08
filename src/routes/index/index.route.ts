import { CommonRoutesConfig } from "../common/common.routes";
import express from "express";
import indexController from "../../controllers/index.controller/index.controller";
import { loginValidator } from "../../validators/admin.validator";
import { adminController } from "../../controllers/admin.controller";
import { userQuries } from "./queries/user.queries";

export class IndexRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Index Routes");
    this.app.use("/", this.router);
  }

  configureRoutes(router: express.Router): express.Application {
    router.get("/", indexController.index);
    router.post("/admin-login", loginValidator, adminController.login);
    router.post("/create-admin-user", adminController.addProfile);
    // User Queries
    userQuries(router);

    return this.app;
  }
}
