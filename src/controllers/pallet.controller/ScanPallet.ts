import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { shipmentDao } from "../../dao/shipment-dao";
import { uuid } from "uuidv4";
import { addEvent } from "../../dao/events-dao/addEvent";
import { updatePalletDao } from "../../dao/pallet-dao/updatePallet.dao";
import { palletDao } from "../../dao/pallet-dao";

export const scanPallet = async (req: Request, res: Response) => {
  try {
    const { userId, origin } = res.locals;
    const { palletId, location } = req.body;

    const { addShipment } = shipmentDao;

    /// check pallet shipment
    const pallet = await palletDao.findByPalletId(palletId);
    if (pallet && pallet.status != "pallet-out") {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Can't Use",
        message: `This Pallet is already assigned for ${pallet.destination} Location. You Can't reassign it before completing the DISPATCH process.`,
      });
    }

    const shipment = await addShipment({
      palletId: palletId,
      shipmentDestination: location,
      shipmentOrigin: origin,
      status: [{ statusName: "created", updatedBy: userId, time: new Date() }],
      latestStatus: "created",
      shipmentId: uuid(),
      virtualId: "B" + palletId + "-" + "0",
    });

    if (!shipment) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Shipment creation error",
        message: "Something went wrong. Please try again.",
      });
    }

    await addEvent({
      eventName: "created",
      eventDomain: "pallet",
      relatedTo: { tableName: "shipments", relatedId: shipment._id },
      createdBy: userId,
    });

    const palletInserted = await updatePalletDao({
      where: {
        palletId: palletId,
      },
      data: {
        palletId: palletId,
        shipmentId: shipment._id,
        status: "pallet-created",
        lastUpdatedBy: { id: userId, time: new Date() },
        hub: origin,
        destination: location,
      },
      upsert: true,
    });

    if (
      palletInserted.upsertedCount === 0 &&
      palletInserted.modifiedCount === 0
    ) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Failed",
        message: "Invalid Pallet ID. Kindly Re-scan the correct pallet.",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Completed",
      message: `Pallet ID - ${palletId} is successfully mapped to location - ${location}`,
    });
  } catch (error: any) {
    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: error.message,
    });
  }
};
