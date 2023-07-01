import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import LocationItemsModel from "../../models/LocationItemsModel";

export const scanItem = async (req: Request, res: Response) => {
  try {
    const { scan } = req.body;

    const item = await LocationItemsModel.findOne({ itemId: scan }).exec();

    if (!item) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Invalid Scan",
        message:
          "Item not found in our database. Kindly scan the correct item.",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Item Founded",
      message: "Item scanned successfully",
      data: {
        location: item.destination,
        itemId: item.itemId,
      },
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
