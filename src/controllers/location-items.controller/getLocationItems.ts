import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { locationItemsDao } from "../../dao/location-item-dao";

export const getLocationItems = async (req: Request, res: Response) => {
  try {
    const { getLocationItemsDao } = locationItemsDao;

    const date = req.query.date as unknown as [Date, Date];
    const search = req.query.search as string;
    const status = req.query.status as "created" | "bagged" | "sort";

    const { data, pageData } = await getLocationItemsDao(req, {
      date: date,
      search: search,
      status: status,
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Data Find Successfully",
      message: "Data Find Successfully",
      data: data,
      pageData: pageData ?? { total: 0 },
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
