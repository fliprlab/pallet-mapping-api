import { CommonRoutesConfig } from "../common/common.routes";
import express, { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import {
  checkAccess,
  checkAccessHub,
} from "../../middleware/auth/auth.middleware";

import { adminHubController } from "../../controllers/admin-hub.controller";
import { userQuery } from "./queries/user.query";
import { locationsQueries } from "./queries/location.query";
import { gridQueries } from "./queries/grid.query";

export class AdminHubRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Admin Routes");
    this.app.use("/hub", checkAccessHub, this.router);
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

    router.get("/get-profile", adminHubController.getHubProfile);

    // user query
    userQuery(router);

    // location query
    locationsQueries(router);

    // grid query
    gridQueries(router);

    return this.app;
  }
}
