import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { updateGrid } from "../../dao/grid-dao/updateGrid";

export const updateGridStatus = async (req: Request, res: Response) => {
  try {
    const { _id, active } = req.body;

    const updated = await updateGrid(_id, {
      active: !active,
    });

    if (updated.modifiedCount === 0) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Invalid Action",
        message: "Grid not updated",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: `Grid updated `,
      message: `Grid updated successfully`,
    });
  } catch (error) {
    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: "Something went wrong. Please try again.",
    });
  }
};
