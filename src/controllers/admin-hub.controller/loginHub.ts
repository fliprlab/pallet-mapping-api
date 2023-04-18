import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { tokenDao } from "../../dao/token-dao";
import { JsonResponse } from "../../utils/jsonResponse";
import { adminHubDao } from "../../dao/admin-hub-dao";
import bcrypt from "bcryptjs";

export const loginHub = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { getUserByUsername } = adminHubDao;
    const admin = await getUserByUsername(username);

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

    const { generateTokenHub } = tokenDao;

    const token = await generateTokenHub(admin);

    if (token) {
      return JsonResponse(res, {
        statusCode: 201,
        status: "success",
        title: "Logged in success",
        message: "Logged in successfully",
        data: { token: token.token, origin: admin.origin, _id: admin._id },
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
