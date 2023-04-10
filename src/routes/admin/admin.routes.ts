import { CommonRoutesConfig } from "../common/common.routes";
import express, { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { checkAccess } from "../../middleware/auth/auth.middleware";
import { adminController } from "../../controllers/admin.controller";
import { userQuery } from "./queries/user.query";
import { locationsQueries } from "./queries/location.query";

export class AdminRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Admin Routes");
    this.app.use("/admin", checkAccess, this.router);
  }

  configureRoutes(router: express.Router): express.Application {
    router.get("/", (req: Request, res: Response) => {
      return JsonResponse(res, {
        statusCode: 200,
        title: "admin api called",
        status: "success",
        message: "api called successfully",
      });
    });

    router.get("/get-profile", adminController.getProfile);
    // User
    userQuery(router);
    // Locations
    locationsQueries(router);

    return this.app;
  }
}
