import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { adminDao } from "../../dao/admin-dao";
import { JsonResponse } from "../../utils/jsonResponse";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { findAdminById } = adminDao;
    const user = await findAdminById(userId);
    if (user) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "success",
        title: "Profile founded",
        message: "profile founded successfully",
        data: user,
      });
    } else {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Profile not founded",
        message: "profile not founded successfully",
        data: user,
      });
    }
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
