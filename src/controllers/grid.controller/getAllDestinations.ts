import { Request, Response } from "express";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import GridModel from "../../models/GridModel";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";
import { getAllDestinationsAggregation } from "../../aggregation/grids/destination.aggregation";

export const getAllDestinations = async (req: Request, res: Response) => {
  try {
    const { data, pageData } = await paginated({
      Model: GridModel,
      aggregationArray: getAllDestinationsAggregation({ req, res }),
      paging: {
        itemPerPage: req.query.itemPerPage as string,
        page: req.query.page as string,
      },
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Data Find Successfully",
      message: "Data Find Successfully",
      data: data,
      pageData: pageData,
    });
  } catch (error) {
    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: "Something went wrong please try again.",
    });
  }
};
