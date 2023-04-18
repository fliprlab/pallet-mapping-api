import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { HubAdminDao } from "../../dao/hub-dao";
import { THubAdmin } from "../../models/type/hubAdmin.";

export const updateHubStatus = async (req: Request, res: Response) => {
  try {
    const { updateDao } = HubAdminDao;
    const { _id, active } = req.body;

    let data: Partial<THubAdmin> = {
      active: !active,
    };

    const user = await updateDao({ data: data, where: { _id: _id } });
    if (user && user.modifiedCount > 0) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "success",
        title: "Success",
        message: "Update user successfully.",
      });
    } else {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: "Can not update user. Please try again.",
      });
    }
  } catch (error) {
    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: "Something went wrong. Please try again.",
    });
  }
};
