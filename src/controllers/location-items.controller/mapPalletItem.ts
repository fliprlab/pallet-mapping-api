import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import PalletModel from "../../models/PalletModel";
import { updateLocationItemDao } from "../../dao/location-item-dao/updateLocationItem.dao";
import validators from "../../validators";
import dao from "../../dao";
import { ItemDao } from "../../dao/item-dao";
import { ObjectId } from "mongodb";
import { locationItemsDao } from "../../dao/location-item-dao";

export const mapPalletItem = async (req: Request, res: Response) => {
  try {
    const { itemId, palletId, location } = req.body;

    const item = await dao.items.getLastLocationItem(itemId);

    const pallet = await PalletModel.findOne({
      palletId: palletId,
    }).exec();

    if (!item || !pallet) {
      return JsonResponse(res, {
        statusCode: 400,
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
          destination: pallet.destination,
        },
        status: "created",
        destination: location,
        origin: res.locals.origin,
        shipmentId: pallet.shipmentId,
      },
    });

    // check pallet is for zone/location
    if (validators.zone.valideZoneId(item.pallet?.destination || "")) {
      // check status of pallet and remove if it is first item out
      if (item.pallet?._id) {
        // remove all items mapping for the
        dao.pallet.updatePallet(item.pallet._id.toString(), {
          status: "pallet-out",
        });
        dao.items.resetZoneItems({ palletId: item.pallet._id });
      }
    }

    if (updated) {
      // push item to the shipment
      dao.shipment.pushItemToShipment({
        shipmentId: pallet.shipmentId,
        item: updated,
      });

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
