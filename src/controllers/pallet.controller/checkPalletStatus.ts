import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { palletDao } from "../../dao/pallet-dao";

export const checkPalletStatus = async (req: Request, res: Response) => {
  try {
    const { palletId } = req.body;

    const { findByPalletId } = palletDao;

    const pallet = await findByPalletId(palletId);

    if (!pallet) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "success",
        title: "Success",
        message: "Pallet not in use.",
      });
    }

    if (pallet.status === "pallet-asign-grid") {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Invalid Pallet Create",
        message: "Grid Already asign this pallet.",
      });
    }

    return JsonResponse(res, {
      statusCode: 226,
      status: "success",
      title: "Pallet In Use",
      message: "Pallet already in use.",
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
