import { NextFunction, Request, Response } from "express";
import { Config } from "../../config/Config";
import { JsonResponse } from "../../utils/jsonResponse";
import jwt from "jsonwebtoken";

export const checkAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const config = new Config();
  const token: any = req.headers[`${config.environmentVariable.headerKey}`];

  if (!token) {
    return JsonResponse(res, {
      statusCode: 401,
      status: "error",
      title: "Authentication Failed",
      message: "No Auth Header Available",
    });
  } else {
    jwt.verify(
      token.replace("Bearer ", ""),
      config.environmentVariable.jwtSecret,
      function (err: any, decoded: any) {
        if (err) {
          return JsonResponse(res, {
            statusCode: 401,
            status: "error",
            title: "Authentication Error",
            message: err.message,
          });
        } else {
          res.locals.userId = decoded.data.userId;
          res.locals.userRole = decoded.data.role;
          next();
        }
      }
    );
  }
};
