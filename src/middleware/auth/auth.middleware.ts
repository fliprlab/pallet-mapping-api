import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import jwt from "jsonwebtoken";
import { adminDao } from "../../dao/admin-dao";
import { usersDao } from "../../dao/users-dao";
import HubAdminModel from "../../models/HubAdminModel";

export const checkAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers[`${process.env.headerKey}`];
    const { findAdminById } = adminDao;

    const bearerToken = token.replace("Bearer ", "");

    if (!bearerToken || bearerToken === "null" || bearerToken === "undefined") {
      return JsonResponse(res, {
        statusCode: 401,
        status: "error",
        title: "Authentication Failed",
        message: "No Auth Header Available",
      });
    }
    const verify: any = await jwt.verify(
      bearerToken,
      process.env.jwtSecret ?? ""
    );

    if (!verify) {
      return JsonResponse(res, {
        statusCode: 401,
        status: "error",
        title: "Authentication Failed",
        message: "No Auth Header Available",
      });
    }

    const admin = await findAdminById(verify.data.userId);

    if (!admin) {
      return JsonResponse(res, {
        statusCode: 401,
        status: "error",
        title: "Authentication Error",
        message: "No user found with this header",
      });
    }

    res.locals.userId = verify.data.userId;
    res.locals.userRole = verify.data.role;
    next();
  } catch (error) {
    return JsonResponse(res, {
      statusCode: 401,
      status: "error",
      title: "Authentication Error",
      message: "No user found with this header",
    });
  }
};

export const checkAccessUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers[`${process.env.headerKey}`];
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
      process.env.jwtSecret ?? "",
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

export const checkAccessHub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers[`${process.env.headerKey}`];

    const bearerToken = token.replace("Bearer ", "");

    if (!bearerToken || bearerToken === "null" || bearerToken === "undefined") {
      return JsonResponse(res, {
        statusCode: 401,
        status: "error",
        title: "Authentication Failed",
        message: "No Auth Header Available",
      });
    }
    const verify: any = await jwt.verify(
      bearerToken,
      process.env.jwtSecret ?? ""
    );

    if (!verify) {
      return JsonResponse(res, {
        statusCode: 401,
        status: "error",
        title: "Authentication Failed",
        message: "No Auth Header Available",
      });
    }

    const user = await HubAdminModel.findById(verify.data.userId).exec();

    if (!user) {
      return JsonResponse(res, {
        statusCode: 401,
        status: "error",
        title: "Authentication Error",
        message: "No user found with this header",
      });
    }

    res.locals.userId = verify.data.userId;
    res.locals.origin = user.origin;
    next();
  } catch (error) {
    return JsonResponse(res, {
      statusCode: 401,
      status: "error",
      title: "Authentication Error",
      message: "No user found with this header",
    });
  }
};
