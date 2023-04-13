import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { palletDao } from "../../dao/pallet-dao";

export const putAwayCheckValidPalletMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { origin } = res.locals;
  const { palletId, location } = req.body;
  const { findByPalletId } = palletDao;

  const pallet = await findByPalletId(palletId);

  if (!pallet) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Invalid Pallet",
      message: "Pallet is empty.",
    });
  }

  if (pallet.hub !== origin || pallet.destination !== location) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Invalid Location",
      message: `Pallet ${
        pallet.hub !== origin ? "origin" : "destination"
      } origin location mismatched.`,
    });
  }

  if (pallet.status === "pallet-asign-grid") {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Already Asigned",
      message: "Grid already asign to this pallet.",
    });
  }
  if (pallet.status === "pallet-out") {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Pallet out",
      message: "Pallet out already.",
    });
  }
  res.locals.pallet = { _id: pallet._id, name: pallet.palletId };
  res.locals.shipmentId = pallet.shipmentId;
  next();
};
