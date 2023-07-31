import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import LocationItemsModel from "../../models/LocationItemsModel";

export const getPalletItems = async (req: Request, res: Response) => {
  try {
    const { data, pageData } = await paginated({
      Model: LocationItemsModel,
      aggregationArray: [
        { $match: { "pallet.name": req.body.pallet } },
        { $sort: { createdAt: -1 } },
      ],
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
