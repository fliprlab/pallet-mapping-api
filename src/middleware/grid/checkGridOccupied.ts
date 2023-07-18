import { NextFunction, Request, Response } from "express";

import { JsonResponse } from "../../utils/jsonResponse";
import GridModel from "../../models/GridModel";

export const checkGridOccupied = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const grid = await GridModel.findById(req.body._id).exec();

  if (grid && grid.status === "occupied") {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Grid Occupied",
      message: "Grid can't be de-active. Grid is occupied",
    });
  }
  next();
};
