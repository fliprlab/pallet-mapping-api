import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { shipmentDao } from "../../dao/shipment-dao";
import { eventsDao } from "../../dao/events-dao";
import { palletDao } from "../../dao/pallet-dao";
import { uuid } from "uuidv4";
import { PALLET_STATUS } from "../../constants";

export const createShipment = async (req: Request, res: Response) => {
  try {
    const { userId, origin } = res.locals;
    const { palletId, items, location } = req.body;
    const { addShipment } = shipmentDao;
    const { addEvent } = eventsDao;
    const { addPallet } = palletDao;

    const shipment = await addShipment({
      palletId,
      items,
      shipmentDestination: location,
      shipmentOrigin: origin,
      status: [{ statusName: "created", updatedBy: userId, time: new Date() }],
      latestStatus: "created",
      shipmentId: uuid(),
    });

    if (!shipment) {
      return JsonResponse(res, {
        statusCode: 500,
        status: "error",
        title: "Not Created Bag",
        message: "Something went wrong. Please try again.",
      });
    }

    await addEvent({
      eventName: "created",
      eventDomain: "pallet",
      relatedTo: { tableName: "shipments", relatedId: shipment._id },
      createdBy: userId,
    });

    await addPallet({
      palletId: palletId,
      shipmentId: shipment._id,
      status: "pallet-created",
      lastUpdatedBy: { id: userId, time: new Date() },
      hub: origin,
      destination: location,
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Shipment Created",
      message: "Shipment created successfully",
    });
  } catch (error) {
    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Not Created",
      message: "Something went wrong. Please try again.",
    });
  }
};
