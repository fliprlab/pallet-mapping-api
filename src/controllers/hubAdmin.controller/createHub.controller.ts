import { logger } from "../../config/logger";
import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { HubAdminDao } from "../../dao/hub-dao";
import LocationModel from "../../models/LocationModel";
import bcrypt from "bcryptjs";

export const createHub = async (req: Request, res: Response) => {
  try {
    const { username, password, origin } = req.body;
    const { createDao } = HubAdminDao;

    const originData = await LocationModel.findById(origin).exec();

    if (!originData) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Origin Not Found",
        message: "Something went wrong. Please try again",
      });
    }

    const inserted = await createDao({
      username: String(username).toLowerCase(),
      origin: {
        _id: originData._id,
        origin: originData.location,
      },
      password: bcrypt.hashSync(password, 10),
    });

    if (!inserted) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: "Something went wrong. Please try again",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Success",
      message: "hub admin created successfully.",
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
