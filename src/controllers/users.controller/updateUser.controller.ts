import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { usersDao } from "../../dao/users-dao";
import { JsonResponse } from "../../utils/jsonResponse";
import bcrypt from "bcryptjs";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { updateUserDao } = usersDao;
    const { _id, userName, active, origin, password } = req.body;

    let data: Partial<TUsers> = {};

    if (userName) {
      data.userName = userName;
    }
    if (active !== undefined) {
      data.active = active;
    }
    if (origin) {
      data.origin = origin;
    }
    if (password) {
      data.password = bcrypt.hashSync(password, 10);
    }
    const user = await updateUserDao(_id || "", data);
    if (!user) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: "Can not update user. Please try again.",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Success",
      message: "Update user successfully.",
    });
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
