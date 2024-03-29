import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { locationDao } from "../../dao/locations-dao";

export const createLocation = async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
    const { location } = req.body;
    const { addLocation } = locationDao;

    // find location
    const find = await locationDao.getLocationByName(location);
    if (find) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "OOPS!",
        message: "Location already added.",
      });
    }

    const inserted = await addLocation({
      location,
      createdBy: { _id: userId, date: new Date() },
    });

    if (!inserted) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Not Created",
        message: "Can not create location. Please try again.",
      });
    }
    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Created",
      message: "Location created successfully.",
    });
  } catch (error: any) {
    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: error.message,
    });
  }
};
