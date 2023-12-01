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
    let message = "";
    let title = "";

    switch (pallet?.status) {
      case "pallet-asign-grid":
        title = "PALLET PUT AWAY";
        message = "Can't assign item";
        break;

      default:
        title = "Failed";
        message = "Pallet is already in Use";
        break;
    }

    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: title,
      message: message,
    });
  }
  next();
};
