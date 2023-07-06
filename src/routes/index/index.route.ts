import { CommonRoutesConfig } from "../common/common.routes";
import express, { Request, Response } from "express";
import indexController from "../../controllers/index.controller/index.controller";

import { adminController } from "../../controllers/admin.controller";
import { userQuries } from "./queries/user.queries";
import { adminHubController } from "../../controllers/admin-hub.controller";
import { rateLimit } from "express-rate-limit";
import { JsonResponse } from "../../utils/jsonResponse";
import { adminMultipleRoleLogin } from "../../controllers/admin-multiple-role-login";

export const maxLoginRequest = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 create account requests per `window` (here, per hour)
  handler: function (req: Request, res: Response /*next*/) {
    return JsonResponse(res, {
      statusCode: 429,
      title: "max login called",
      status: "error",
      message: "Your access is temporary blocked. Try after some time",
    });
  },

  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export class IndexRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Index Routes");
    this.app.use("/", this.router);
  }

  configureRoutes(router: express.Router): express.Application {
    router.get("/", indexController.index);
    router.post("/admin-login", maxLoginRequest, adminMultipleRoleLogin);
    router.post("/create-admin-user", adminController.addProfile);

    // User Queries
    userQuries(router);

    // Admin hub

    router.post("/login-hub", maxLoginRequest, adminHubController.loginHub);

    return this.app;
  }
}
