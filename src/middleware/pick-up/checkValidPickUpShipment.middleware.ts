import { NextFunction, Request, Response } from "express";
import { shipmentDao } from "../../dao/shipment-dao";
import { gridDao } from "../../dao/grid-dao";
import { JsonResponse } from "../../utils/jsonResponse";

export const checkValidPickUpShipmentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { shipmentId, gridId } = req.body;
  const { origin } = res.locals;
  const { getShipmentById, updateShipment } = shipmentDao;
  const { findGridById, updateGrid } = gridDao;

  const shipment = await getShipmentById(shipmentId);

  if (!shipment) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Invalid Shipment",
      message: "Shipment id is incorrect.",
    });
  }

  if (shipment.shipmentOrigin !== origin) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Invalid Shipment",
      message: "Shipment origin location mismatched with user origin.",
    });
  }

  if (shipment.latestStatus !== "asign-grid") {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Invalid Status",
      message: `Shipment status was ${shipment.latestStatus}.`,
    });
  }

  const grid = await findGridById(shipment.gridId);

  if (!grid) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Grid not found.",
      message: `Grid Not found.`,
    });
  }

  if (!grid.active) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Grid In-Active.",
      message: `Grid In-Active.`,
    });
  }

  if (grid.gridId !== gridId) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Mismatched",
      message: `Grid id not matched.`,
    });
  }

  if (grid.status === "unoccupied") {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Already Unoccupied",
      message: `Grid is empty.`,
    });
  }
  res.locals.gridId = shipment.gridId;
  res.locals.palletId = grid.palletId;
  next();
};
