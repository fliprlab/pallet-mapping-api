import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { gridDao } from "../../dao/grid-dao";
import { locationDao } from "../../dao/locations-dao";

export const createGrid = async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
    const { gridId, location } = req.body;
    const { addGrid } = gridDao;
    const { getLocationById } = locationDao;

    const locationData = await getLocationById(location);

    if (!locationData) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Invalid Location",
        message: "location not found",
      });
    }

    const grid = await addGrid({
      gridId: gridId,
      createdBy: userId,
      hub: { _id: locationData._id, name: locationData.location },
      time: new Date(),
    });

    if (!grid) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Grid Not Created",
        message: "Something went wrong. Please try again.",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Grid Created",
      message: "Grid created successfully.",
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
