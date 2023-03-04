import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { usersDao } from "../../dao/users-dao";
import { JsonResponse } from "../../utils/jsonResponse";
const bcrypt = require("bcryptjs");

export const addUser = async (req: Request, res: Response) => {
  try {
    const { addUserDao, findUserByNameDao } = usersDao;
    const { userName, origin, password }: TUsers = req.body;

    const findUser = await findUserByNameDao(userName);

    if (findUser) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: "User name already exists.",
      });
    }

    const user = await addUserDao({
      userName: userName.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      origin,
    });
    if (!user) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: "Can not create user. Please try again.",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Success",
      message: "Create user successfully.",
    });
  } catch (error: any) {
    console.log("error--", error.message);

    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: error.message,
    });
  }
};
