import { NextFunction, Request, Response } from "express";
import { palletDao } from "../../dao/pallet-dao";
import { JsonResponse } from "../../utils/jsonResponse";
import { shipmentDao } from "../../dao/shipment-dao";
import { ItemDao } from "../../dao/item-dao";

export const createShipmentsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = res.locals;
  const { palletId } = req.body;
  const { findByPalletId } = palletDao;
  const { updateShipment } = shipmentDao;
  const { updateItems } = ItemDao;

  const pallet = await findByPalletId(palletId);

  if (!pallet) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Invalid Pallet",
      message: "Pallet is empty.",
    });
  }

  if (pallet.status === "pallet-created") {
    await updateShipment(
      pallet.shipmentId.toString(),
      { latestStatus: "cancelled" },
      { statusName: "cancelled", time: new Date(), updatedBy: userId }
    );

    await updateItems({
      shipmentId: pallet.shipmentId,
      data: {
        cancelAt: new Date(),
        lastUpdatedAt: new Date(),
        status: "cancelled",
      },
    });
  }

  next();
};
