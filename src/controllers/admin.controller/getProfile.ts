import { Request, Response } from "express";
import { logger } from "../../config/logger";

import { JsonResponse } from "../../utils/jsonResponse";
import AdminUserModel from "../../models/AdminModel";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const user = await AdminUserModel.findById(userId, {
      password: 0,
      active: 0,
    }).exec();

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
