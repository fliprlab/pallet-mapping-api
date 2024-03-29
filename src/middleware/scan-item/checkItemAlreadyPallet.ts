import { NextFunction, Request, Response } from "express";
import HubAdminModel from "../../models/HubAdminModel";
import { JsonResponse } from "../../utils/jsonResponse";
import LocationItemsModel from "../../models/LocationItemsModel";

export const checkItemAlreadyPallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const item = await LocationItemsModel.findOne({
    pallet: { $ne: null },
    itemId: req.body.scan,
  }).exec();

  if (item) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Failed",
      message: "Item is already assigned to the Pallet",
    });
  }
  next();
};
