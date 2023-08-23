import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import LocationItemsModel from "../../models/LocationItemsModel";
import dao from "../../dao";

export const getPalletItems = async (req: Request, res: Response) => {
  try {
    const { pallet } = req.body;

    // get shipping id for the pallet
    const palletData = await dao.pallet.findByPalletId(pallet);

    if (!palletData) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "success",
        title: "Data Find Successfully",
        message: "Data Find Successfully",
      });
    }

    const { data, pageData } = await paginated({
      Model: LocationItemsModel,
      aggregationArray: [
        { $match: { shipmentId: palletData.shipmentId } },
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
