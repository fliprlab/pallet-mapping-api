import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import LocationModel from "../../models/LocationModel";
import { gridDao } from "../../dao/grid-dao";
import { TGrid } from "../../models/type/grid";
import { ObjectId } from "mongodb";

export const addMultipleGrids = async (req: Request, res: Response) => {
  try {
    const { grids } = req.body;
    const { userId, origin } = res.locals;
    const { upsertGrids } = gridDao;

    const data: TGrid[] = grids.map((item: string) => ({
      gridId: item,
      createdBy: userId,
      hub: { _id: origin._id, name: origin.origin },
      time: new Date(),
      updatedBy: { _id: userId, time: new Date() },
    }));

    Promise.all(
      data.map(async (item) => {
        await upsertGrids(item);
      })
    );

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Grid Created",
      message: "Grid created successfully.",
    });
  } catch (error: any) {
    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: error.message,
    });
  }
};
