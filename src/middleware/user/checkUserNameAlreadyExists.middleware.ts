import { NextFunction, Request, Response } from "express";
import { usersDao } from "../../dao/users-dao";
import { JsonResponse } from "../../utils/jsonResponse";

export const checkUserNameAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { findUserByIdDao, findUserByNameDao } = usersDao;
  const { _id, userName } = req.body;
  const byName = await findUserByNameDao(userName);
  if (_id) {
    const byId = await findUserByIdDao(_id);
    if (byId && byId.userName !== userName?.toLowerCase() && byName) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: "User name already exists.",
      });
    }
  } else {
    if (byName) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: "User name already exists.",
      });
    }
  }

  next();
};
