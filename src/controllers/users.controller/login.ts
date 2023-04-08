import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { adminDao } from "../../dao/admin-dao";
import { tokenDao } from "../../dao/token-dao";
import { JsonResponse } from "../../utils/jsonResponse";
import { usersDao } from "../../dao/users-dao";
const bcrypt = require("bcryptjs");

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { findUserByNameDao } = usersDao;
    const admin = await findUserByNameDao(username);

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
