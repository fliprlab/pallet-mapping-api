import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { updateLocationItemDao } from "../../dao/location-item-dao/updateLocationItem.dao";

export const removePalletItem = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    const updated = await updateLocationItemDao({
      where: {
        _id: _id,
      },
      data: {
        status: "created",
      },
      unsetData: {
        pallet: 1,
      },
    });

    if (updated.modifiedCount === 0) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Invalid item",
        message: "Item not removed or item not found",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Item removed from pallet",
      message: "Item removed from pallet successfully",
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
