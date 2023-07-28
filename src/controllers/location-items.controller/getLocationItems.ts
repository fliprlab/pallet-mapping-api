import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { locationItemsDao } from "../../dao/location-item-dao";

export const getLocationItems = async (req: Request, res: Response) => {
  try {
    const { getLocationItemsDao } = locationItemsDao;
    const { data, pageData } = await getLocationItemsDao(req, res);

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
