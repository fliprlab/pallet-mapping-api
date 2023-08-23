import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import LocationItemsModel from "../../models/LocationItemsModel";
import PalletModel from "../../models/PalletModel";
import { ObjectId } from "mongodb";

export const getPalletLocationItems = async (req: Request, res: Response) => {
  try {
    const { scan } = req.body;
    const pallet = await PalletModel.findOne({
      palletId: scan,
    }).exec();

    if (!pallet) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Pallet not found",
        message: "Invalid pallet id scanned",
      });
    }

    const { data } = await paginated({
      Model: LocationItemsModel,
      aggregationArray: [
        { $match: { shipmentId: new ObjectId(pallet.shipmentId) } },
        { $sort: { createdAt: -1 } },
      ],
      paging: {
        itemPerPage: req.query.itemPerPage as string,
        page: req.query.page as string,
      },
    });

    let stringData = ``;
    data.forEach((item) => {
      stringData += `${item.itemId}\n`;
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Data Find Successfully",
      message: "Data Find Successfully",
      data: {
        qrCodeData: stringData,
        virtualId: "B" + pallet.palletId + "-" + `${data.length}`,
      },
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
