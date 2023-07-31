import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import LocationModel from "../../models/LocationModel";

export const findLocations = async (req: Request, res: Response) => {
  try {
    const { data, pageData } = await paginated({
      paging: {
        itemPerPage: req.query.itemPerPage as string,
        page: req.query.page as string,
      },
      Model: LocationModel,
      aggregationArray: [
        {
          $sort: {
            _id: -1,
          },
        },
      ],
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Found Successfully",
      message: "Location find successfully",
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
