import { CommonRoutesConfig } from "../common/common.routes";
import express, { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { checkAccessUser } from "../../middleware/auth/auth.middleware";
import { usersController } from "../../controllers/users.controller";
import { locationQueries } from "./query/location.query";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "User Routes");
    this.app.use("/user", checkAccessUser, this.router);
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

    router.get("/get-profile", usersController.getUserProfile);
    // locations
    locationQueries(router);

    return this.app;
  }
}
