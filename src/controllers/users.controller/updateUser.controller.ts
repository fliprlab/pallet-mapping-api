import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { usersDao } from "../../dao/users-dao";
import { JsonResponse } from "../../utils/jsonResponse";
import bcrypt from "bcryptjs";
import { TUsers } from "../../models/type/users";
import LocationModel from "../../models/LocationModel";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { updateUserDao } = usersDao;
    const { _id, userName, active, origin, password } = req.body;

    const originData = await LocationModel.findById(origin).exec();

    if (!originData) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Origin Not Found",
        message: "Something went wrong. Please try again",
      });
    }

    let data: Partial<TUsers> = {
      userName,
      active,
      origin: {
        _id: originData._id,
        origin: originData.location,
      },
    };

    if (password) {
      data.password = bcrypt.hashSync(password, 10);
    }

    const user = await updateUserDao({ data: data, where: { _id: _id } });
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
