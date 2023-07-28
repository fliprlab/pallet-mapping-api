import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import GridModel from "../../models/GridModel";

export const getHubAdminGridCountData = async (req: Request, res: Response) => {
  try {
    const { origin } = res.locals;

    const totalGrids = await GridModel.find({
      "hub._id": origin._id,
      active: { $ne: false },
    }).exec();

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Card data found successfully.",
      message: "Card data found successfully.",
      data: {
        total: totalGrids.length,
        unoccupied: totalGrids.filter((item) => item.status === "unoccupied")
          .length,
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
