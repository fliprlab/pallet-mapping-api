import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import PalletModel from "../../models/PalletModel";

export const checkPalletAlreadyInUse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { palletId } = req.body;
  const pallet = await PalletModel.findOne({
    palletId: palletId,
  }).exec();

  if (pallet && pallet.status !== "pallet-created") {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Failed",
      message: "Pallet is already in Use",
    });
  }
  next();
};
