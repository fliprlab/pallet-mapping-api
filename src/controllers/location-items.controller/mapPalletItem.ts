import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import LocationItemsModel from "../../models/LocationItemsModel";
import PalletModel from "../../models/PalletModel";
import { updateLocationItemDao } from "../../dao/location-item-dao/updateLocationItem.dao";

export const mapPalletItem = async (req: Request, res: Response) => {
  try {
    const { itemId, palletId, location } = req.body;

    const item = await LocationItemsModel.findOne({ itemId: itemId }).exec();

    const pallet = await PalletModel.findOne({ palletId: palletId }).exec();

    if (!item || !pallet) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Invalid Scan",
        message:
          "This Pallet is not mapped to the items location. Kindly re-scan the correct pallet",
      });
    }

    const updated = await updateLocationItemDao({
      where: {
        _id: item._id,
      },
      data: {
        pallet: {
          _id: pallet._id,
          name: pallet.palletId,
        },
        status: "created",
        destination: location,
        origin: res.locals.origin,
        shipmentId: pallet.shipmentId,
      },
    });

    if (updated.modifiedCount > 0) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "success",
        title: "Pallet Mapped",
        message: "Item Added successfully",
        data: item.destination,
      });
    } else {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Invalid Scan",
        message:
          "This Pallet is not mapped to the items location. Kindly re-scan the correct pallet",
      });
    }
  } catch (error) {
    logger.error(error);
    console.log("Error ", error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: "Something went wrong. Please try again.",
    });
  }
};
