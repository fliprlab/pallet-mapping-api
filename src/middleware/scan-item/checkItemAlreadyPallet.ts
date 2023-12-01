import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import validators from "../../validators";
import dao from "../../dao";

export const checkItemAlreadyPallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { scan } = req.body;

  const item = await dao.items.getLastLocationItem(scan);
  if (!item) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Failed",
      message: "Item not found",
    });
  }

  if (item.pallet?._id) {
    // check item in zone pallet
    if (validators.zone.valideZoneId(item.pallet?.destination ?? "")) {
      next();
    } else {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Failed",
        message: "Item is already assigned to the Pallet",
      });
    }
  } else {
    next();
  }
};
