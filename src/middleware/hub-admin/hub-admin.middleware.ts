import { NextFunction, Request, Response } from "express";
import HubAdminModel from "../../models/HubAdminModel";
import { JsonResponse } from "../../utils/jsonResponse";

export const checkUniqueUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await HubAdminModel.findOne({
    username: String(req.body.username).toLowerCase(),
  }).exec();

  if (user) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "username already added",
      message: "username must be unique",
    });
  }
  next();
};
