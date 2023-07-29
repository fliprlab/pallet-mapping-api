import { Request, Response } from "express";
import PalletModel from "../../models/PalletModel";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import { JsonResponse } from "../../utils/jsonResponse";

export const getPallets = async (req: Request, res: Response) => {
  try {
    const { data, pageData } = await paginated({
      Model: PalletModel,
      aggregationArray: [
        {
          $sort: {
            palletId: 1,
          },
        },
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
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: "Something went wrong. Please try again.",
    });
  }
};
