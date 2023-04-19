import { NextFunction, Request, Response } from "express";
import { Config } from "../../config/Config";
import { JsonResponse } from "../../utils/jsonResponse";
import jwt from "jsonwebtoken";
import { adminDao } from "../../dao/admin-dao";
import { usersDao } from "../../dao/users-dao";
import HubAdminModel from "../../models/HubAdminModel";

export const checkAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const config = new Config();
  const token: any = req.headers[`${config.environmentVariable.headerKey}`];
  const { findAdminById } = adminDao;

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
      async function (err: any, decoded: any) {
        if (err) {
          return JsonResponse(res, {
            statusCode: 401,
            status: "error",
            title: "Authentication Error",
            message: err.message,
          });
        } else {
          const admin = await findAdminById(decoded.data.userId);

          if (!admin) {
            return JsonResponse(res, {
              statusCode: 401,
              status: "error",
              title: "Authentication Error",
              message: "No user found with this header",
            });
          }

          res.locals.userId = decoded.data.userId;
          res.locals.userRole = decoded.data.role;
          next();
        }
      }
    );
  }
};

export const checkAccessUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const config = new Config();
  const token: any = req.headers[`${config.environmentVariable.headerKey}`];
  const { findUserByIdDao } = usersDao;

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
      async function (err: any, decoded: any) {
        if (err) {
          return JsonResponse(res, {
            statusCode: 401,
            status: "error",
            title: "Authentication Error",
            message: err.message,
          });
        } else {
          const user = await findUserByIdDao(decoded.data.userId);

          if (!user) {
            return JsonResponse(res, {
              statusCode: 401,
              status: "error",
              title: "Authentication Error",
              message: "No user found with this header",
            });
          }

          res.locals.userId = decoded.data.userId;
          res.locals.origin = user.origin.origin ?? user.origin.toString();
          next();
        }
      }
    );
  }
};

export const checkAccessHub = (
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
      async function (err: any, decoded: any) {
        if (err) {
          return JsonResponse(res, {
            statusCode: 401,
            status: "error",
            title: "Authentication Error",
            message: err.message,
          });
        } else {
          const user = await HubAdminModel.findById(decoded.data.userId).exec();

          if (!user) {
            return JsonResponse(res, {
              statusCode: 401,
              status: "error",
              title: "Authentication Error",
              message: "No user found with this header",
            });
          }

          res.locals.userId = decoded.data.userId;
          res.locals.origin = user.origin;
          next();
        }
      }
    );
  }
};
