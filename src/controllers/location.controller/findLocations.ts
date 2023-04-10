import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";
import { locationDao } from "../../dao/locations-dao";

export const findLocations = async (req: Request, res: Response) => {
  try {
    const { getLocations } = locationDao;
    const locations = await getLocations([
      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    if (!locations) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Not Found",
        message: "Can not find locations. Please try again.",
      });
    }
    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Found Successfully",
      message: "Location find successfully",
      data: locations,
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
