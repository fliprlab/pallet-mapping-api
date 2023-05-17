import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { adminDao } from "../../dao/admin-dao";
import { tokenDao } from "../../dao/token-dao";
import { JsonResponse } from "../../utils/jsonResponse";
const bcrypt = require("bcryptjs");

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const { findAdminByEmail } = adminDao;
    const admin = await findAdminByEmail(username);

    if (!admin) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "User not exist",
        message: "User not found with this username",
      });
    }
    const passwordVerified = bcrypt.compareSync(password, admin.password);

    if (!passwordVerified) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Entered Wrong Password",
        message: "Please enter a correct password",
      });
    }

    if (!admin.active) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "User not active",
        message: "user not active, please contact to a developer",
      });
    }

    const { generateAuthToken } = tokenDao;

    const token = await generateAuthToken(admin);

    if (token) {
      return JsonResponse(res, {
        statusCode: 201,
        status: "success",
        title: "Logged in success",
        message: "Logged in successfully",
        data: token.token,
        extraData: admin.role,
      });
    } else {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "authentication failed",
        message: "something went wrong. try again later",
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
