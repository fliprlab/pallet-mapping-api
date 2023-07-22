import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";

import { locationItemsDao } from "../../dao/location-item-dao";

import { TLocationItems } from "../../models/type/location-items";
import LocationModel from "../../models/LocationModel";
import LocationItemsModel from "../../models/LocationItemsModel";
import { REGX } from "../../constants";

export const uploadLocationItem = async (req: Request, res: Response) => {
  try {
    const { items } = req.body as { items: TLocationItems[] };

    const invalidLocation: TLocationItems[] = [];
    const duplicateEntries: TLocationItems[] = [];
    const validEntries: TLocationItems[] = [];
    const invalidEntries: TLocationItems[] = [];

    await Promise.all(
      items.map(async (item) => {
        const location = await LocationModel.findOne({
          location: item.destination,
        }).exec();

        if (!location) {
          invalidLocation.push({ ...item, reason: "Location Not Available" });
        } else {
          const duplicate = await LocationItemsModel.findOne({
            itemId: item.itemId,
          }).exec();

          if (duplicate) {
            duplicateEntries.push({ ...item, reason: "Duplicate items" });
          } else if (!REGX.LPST.test(item.lpst)) {
            invalidEntries.push({ ...item, reason: "Incorrect LPST" });
          } else {
            validEntries.push({ ...item, reason: "Item Created" });
          }
        }
      })
    );

    const { addLocationItems } = locationItemsDao;

    const inserted = await addLocationItems(validEntries);

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Items created",
      message: "Items Created Successfully",
      data: {
        invalidLocation,
        duplicateEntries,
        inserted,
        invalidEntries,
      },
    });
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
