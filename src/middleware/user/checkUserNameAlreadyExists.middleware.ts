import { NextFunction, Request, Response } from "express";
import { usersDao } from "../../dao/users-dao";
import { JsonResponse } from "../../utils/jsonResponse";

export const checkUserNameAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { findUserByNameDao } = usersDao;
  const { _id, userName } = req.body;
  const findUserByName = await findUserByNameDao(userName);
  if (!findUserByName || findUserByName._id == _id) {
    next();
  } else {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Error",
      message: "User name already exists.",
    });
  }
};
