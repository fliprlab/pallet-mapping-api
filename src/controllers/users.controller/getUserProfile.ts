import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId, origin } = res.locals;

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Profile found.",
      message: "Profile found.",
      data: { _id: userId, origin },
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
