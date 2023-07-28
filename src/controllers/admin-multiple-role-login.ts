import { Request, Response } from "express";
import { JsonResponse } from "../utils/jsonResponse";
import { logger } from "../config/logger";
import { adminHubDao } from "../dao/admin-hub-dao";
import { adminDao } from "../dao/admin-dao";
import { adminController } from "./admin.controller";
import { adminHubController } from "./admin-hub.controller";

export const adminMultipleRoleLogin = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const { login } = adminController;
    const { loginHub } = adminHubController;
    const { getUserByUsername } = adminHubDao;
    const { findAdminByEmail } = adminDao;

    const admin = await findAdminByEmail(username);

    if (admin) {
      return await login(req, res);
    }

    const hubAdmin = await getUserByUsername(username);

    if (hubAdmin) {
      return await loginHub(req, res);
    }

    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "User not exist",
      message: "User not found with this username",
    });
  } catch (error: any) {
    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Server Error",
      message: error.message,
    });
  }
};
