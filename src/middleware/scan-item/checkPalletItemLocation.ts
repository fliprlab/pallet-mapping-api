import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import PalletModel from "../../models/PalletModel";

export const checkPalletItemLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { palletId, location } = req.body;
  const pallet = await PalletModel.findOne({
    palletId: palletId,
    destination: location,
  }).exec();

  if (!pallet) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Failed",
      message: "Location of pallet and Item Should be same",
    });
  }
  next();
};
