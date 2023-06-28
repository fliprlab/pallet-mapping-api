import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";

import { locationItemsDao } from "../../dao/location-item-dao";

import { TLocationItems } from "../../models/type/location-items";

export const uploadLocationItem = async (req: Request, res: Response) => {
  try {
    const { items } = req.body as { items: TLocationItems[] };

    const { addLocationItems } = locationItemsDao;

    const inserted = await addLocationItems(items);

    if (inserted.length > 0) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "success",
        title: "Items created",
        message: "Items Created Successfully",
      });
    } else {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Error",
        message: "Something went wrong. Please try again",
      });
    }
  } catch (error: any) {
    logger.error(error);

    if (String(error.message).search("E11000") === 0) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Duplicate items",
        message: "Duplicate items found",
      });
    }
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Server Error",
      message: error.message,
    });
  }
};
