import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { gridDao } from "../../dao/grid-dao";
import { eventsDao } from "../../dao/events-dao";
import { palletDao } from "../../dao/pallet-dao";
import { shipmentDao } from "../../dao/shipment-dao";
import { ItemDao } from "../../dao/item-dao";
import { ObjectId } from "mongodb";

export const asignGrid = async (req: Request, res: Response) => {
  try {
    const { gridId, location } = req.body;
    const { userId, origin, pallet, shipmentId } = res.locals;
    const { findByGridId, updateGrid } = gridDao;
    const { updatePallet } = palletDao;
    const { updateShipment } = shipmentDao;
    const { addEvent } = eventsDao;
    const { updateItems } = ItemDao;

    const grid = await findByGridId(gridId);

    if (!grid) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Invalid Grid Id",
        message: "Grid not find with this id.",
      });
    }

    if (grid.status === "occupied") {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Already occupied",
        message: "This grid already asigned.",
      });
    }

    if (grid.hub.name !== origin) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Grid Origin Invalid",
        message: "Grid hub and user origin not matched.",
      });
    }

    const update = await updateGrid(grid._id.toString(), {
      palletId: pallet,
      time: new Date(),
      status: "occupied",
      updatedBy: { _id: userId, time: new Date() },
      destination: location,
    });

    if (!update) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Not Mapped Grid",
        message: "Something went wrong. Please try again.",
      });
    }

    await updatePallet(pallet._id, {
      lastUpdatedBy: { id: userId, time: new Date() },
      status: "pallet-asign-grid",
      asignGrid: grid._id,
    });

    await updateShipment(
      shipmentId,
      {
        gridId: grid._id,
        latestStatus: "asign-grid",
      },
      { statusName: "asign-grid", time: new Date(), updatedBy: userId }
    );

    await addEvent({
      createdBy: userId,
      eventDomain: "pallet",
      eventName: "asign-grid",
      relatedTo: { tableName: "shipments", relatedId: shipmentId },
    });

    await addEvent({
      createdBy: userId,
      eventDomain: "grid",
      eventName: "asign-grid",
      relatedTo: { tableName: "shipments", relatedId: shipmentId },
    });

    await updateItems({
      shipmentId: new ObjectId(shipmentId),
      data: {
        status: "asign-grid",
        lastUpdatedAt: new Date(),
        grid: {
          _id: grid._id,
          name: grid.gridId,
        },
      },
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Mapped successfully",
      message: `Grid ${gridId} is mapped successfully with pallet ${pallet.name}.`,
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
