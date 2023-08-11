import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import PalletModel from "../../models/PalletModel";
import { regExpCaseInsen } from "../../constants";

export const checkPalletItemLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { palletId, location, zone } = req.body;
  const pallet = await PalletModel.findOne({
    palletId: palletId,
    $or: [
      { destination: regExpCaseInsen(location) },
      { destination: regExpCaseInsen(zone) },
    ],
  }).exec();

  if (!pallet) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Failed",
      message: "Pallet ID doesn't match the location. Kindly re-scan. ",
    });
  }
  next();
};
