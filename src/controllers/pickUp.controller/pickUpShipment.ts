import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { shipmentDao } from "../../dao/shipment-dao";
import { gridDao } from "../../dao/grid-dao";
import { palletDao } from "../../dao/pallet-dao";
import { eventsDao } from "../../dao/events-dao";
import { ItemDao } from "../../dao/item-dao";
import { ObjectId } from "mongodb";
import LocationItemsModel from "../../models/LocationItemsModel";

export const pickUpShipment = async (req: Request, res: Response) => {
  try {
    const { shipmentId } = req.body;
    const { gridId, palletId, userId } = res.locals;
    const { updateShipment } = shipmentDao;
    const { updateGrid } = gridDao;
    const { updatePallet } = palletDao;
    const { addEvent } = eventsDao;
    const { updateItems } = ItemDao;

    const update = await updateShipment(
      shipmentId,
      {
        gridId: gridId,
        latestStatus: "out",
      },
      { statusName: "out", time: new Date(), updatedBy: userId }
    );

    if (update.modifiedCount === 0) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "not Updated",
        message: "Can not updated shipment. Please try again.",
      });
    }

    await updateGrid(gridId, {
      time: new Date(),
      status: "unoccupied",
      updatedBy: { _id: userId, time: new Date() },
    });

    await updatePallet(palletId._id, {
      status: "pallet-out",
      lastUpdatedBy: { id: userId, time: new Date() },
    });

    await updateItems({
      shipmentId: new ObjectId(shipmentId),
      data: { status: "out", lastUpdatedAt: new Date() },
    });

    await LocationItemsModel.updateMany(
      { shipmentId },
      {
        $set: { status: "picked up" },
      }
    ).exec();

    await addEvent({
      createdBy: userId,
      eventDomain: "pallet",
      eventName: "out",
      relatedTo: { tableName: "shipments", relatedId: shipmentId },
    });

    await addEvent({
      createdBy: userId,
      eventDomain: "grid",
      eventName: "out",
      relatedTo: { tableName: "shipments", relatedId: shipmentId },
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Pick up successfully",
      message: `Grid is matched & scanned successfully.`,
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
