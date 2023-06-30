import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import LocationModel from "../../models/LocationModel";

export const scanPalletLocation = async (req: Request, res: Response) => {
  try {
    const { scan } = req.body;

    const location = await LocationModel.findOne({ location: scan }).exec();

    if (!location) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Invalid Location Scanned",
        message: "Invalid Location. Scan the valid location",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Location Founded",
      message: "Location scanned successfully",
      data: location.location,
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
