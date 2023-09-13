import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import dao from "../../dao";

export const scanPallet = async (req: Request, res: Response) => {
  try {
    const { scan } = req.body;
    const pallet = await dao.pallet.findByPalletId(scan);

    if (!pallet) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Pallet not found",
        message: "Invalid pallet id scanned",
      });
    }

    // if pallet is not picked up
    if (pallet.status !== "pallet-picked-up") {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Not Allowed",
        message:
          "This pallet has not been picked up, so it cannot be dispatched.",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Success",
      message: "Pallet Scan Successfully",
      data: {
        pallet_id: pallet.id,
      },
    });
  } catch (error: any) {
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: error.message,
    });
  }
};
