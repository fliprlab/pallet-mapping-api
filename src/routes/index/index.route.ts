import { CommonRoutesConfig } from "../common/common.routes";
import express, { Request, Response } from "express";
import indexController from "../../controllers/index.controller/index.controller";
import { loginValidator } from "../../validators/admin.validator";
import { adminController } from "../../controllers/admin.controller";
import { userQuries } from "./queries/user.queries";
import { adminHubController } from "../../controllers/admin-hub.controller";
import { rateLimit } from "express-rate-limit";
import { JsonResponse } from "../../utils/jsonResponse";
import { adminMultipleRoleLogin } from "../../controllers/admin-multiple-role-login";

export class IndexRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Index Routes");
    this.app.use("/", this.router);
  }

  configureRoutes(router: express.Router): express.Application {
    const maxLoginRequest = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 hour
      max: 3, // Limit each IP to 5 create account requests per `window` (here, per hour)
      handler: function (req: Request, res: Response /*next*/) {
        return JsonResponse(res, {
          statusCode: 429,
          title: "max login called",
          status: "error",
          message:
            "Too many tries to login from this IP, please try again after an hour",
        });
      },

      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });

    router.get("/", indexController.index);

    router.post("/admin-login", maxLoginRequest, adminMultipleRoleLogin);
    router.post(
      "/create-admin-user",
      maxLoginRequest,
      adminController.addProfile
    );

    // User Queries
    userQuries(router);

    // Admin hub

    router.post("/login-hub", maxLoginRequest, adminHubController.loginHub);

    return this.app;
  }
}
