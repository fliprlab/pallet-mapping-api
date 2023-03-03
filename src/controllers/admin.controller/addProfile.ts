import { logger } from "../../config/logger";
import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { adminDao } from "../../dao/admin-dao";
const bcrypt = require("bcryptjs");

export const addProfile = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { createAdminUser } = adminDao;

    const user = await createAdminUser({
      username: username,
      password: bcrypt.hashSync(password, 10),
    });

    if (!user) {
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
      message: "User created successfully.",
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
