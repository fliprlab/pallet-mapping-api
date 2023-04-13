import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { getPickUpItemAggregation } from "../../aggregation/pick-up/getPickUpItem.aggregation";
import { shipmentDao } from "../../dao/shipment-dao";

export const getPickUpShipments = async (req: Request, res: Response) => {
  try {
    const { getShipments } = shipmentDao;
    const aggregation = getPickUpItemAggregation(req, res);

    const shipments = await getShipments(aggregation);

    if (!shipments) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Not Found",
        message: "Shipments not Found.",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Shipments Found",
      message: "Shipments found successfully.",
      data: shipments,
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
