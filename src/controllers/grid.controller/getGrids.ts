import { Request, Response } from "express";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import GridModel from "../../models/GridModel";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";

export const getGrids = async (req: Request, res: Response) => {
  try {
    const { data, pageData } = await paginated({
      Model: GridModel,
      aggregationArray: [
        {
          $sort: {
            _id: -1,
          },
        },
      ],
      req,
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
