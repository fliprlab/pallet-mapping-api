import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import LocationModel from "../../models/LocationModel";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import ShipmentsModel from "../../models/shipmentsModel";
import { getLocationPalletsAggregation } from "../../aggregation/pallets/pallet.aggregation";
import { regExpLocation } from "../../constants";

export const getLocationPallets = async (req: Request, res: Response) => {
  try {
    const { destination } = req.body;

    console.log("destination", destination);

    const location = await LocationModel.findOne({
      location: regExpLocation(destination),
    }).exec();

    if (!location) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Invalid Location Scanned",
        message: "Invalid Location. Scan the valid location",
      });
    }

    const { data, pageData } = await paginated({
      Model: ShipmentsModel,
      req,
      aggregationArray: getLocationPalletsAggregation({ req, res }),
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Pallet data",
      message: "Pallet Data successfully",
      data: data,
      pageData: pageData,
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
