import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { palletDao } from "../../dao/pallet-dao";

export const checkValidPallet = async (req: Request, res: Response) => {
  try {
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
        } location mismatched.`,
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

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Valid Pallet",
      message: "You can mapped this pallet.",
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
