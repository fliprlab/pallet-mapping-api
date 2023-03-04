import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { usersDao } from "../../dao/users-dao";
import { JsonResponse } from "../../utils/jsonResponse";
const bcrypt = require("bcryptjs");

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { updateUserDao, findUserByIdDao, findUserByNameDao } = usersDao;
    const { id, data }: { id: string; data: Partial<TUsers> } = req.body;

    const byId = await findUserByIdDao(id);
    const byName = await findUserByNameDao(data.userName || "");

    if (byId && byId.userName !== data.userName?.toLowerCase() && byName) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: "User name already exists.",
      });
    }

    let update = { ...data };

    if (data.password && data.password !== "") {
      update.password = bcrypt.hashSync(data.password, 10);
    }

    const user = await updateUserDao(id, update);
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
