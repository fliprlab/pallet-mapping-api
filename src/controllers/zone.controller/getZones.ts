import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import ZoneModel from "../../models/ZoneModel";

export const getZones = async (req: Request, res: Response) => {
  try {
    try {
      const { data, pageData } = await paginated({
        paging: {
          itemPerPage: req.query.itemPerPage as string,
          page: req.query.page as string,
        },
        Model: ZoneModel,
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
      return JsonResponse(res, {
        statusCode: 500,
        status: "error",
        title: "Error",
        message: "Something went wrong. Please try again.",
      });
    }
  } catch (error: any) {
    console.log("error--", error.message);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: error.message,
    });
  }
};
