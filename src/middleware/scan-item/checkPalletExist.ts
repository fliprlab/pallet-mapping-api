import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import PalletModel from "../../models/PalletModel";

export const checkPalletExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { palletId } = req.body;

  console.log("palletId", palletId);

  const pallet = await PalletModel.findOne({
    palletId: palletId,
  }).exec();

  if (!pallet) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Failed",
      message: "Pallet not found in the record.",
    });
  }
  next();
};
