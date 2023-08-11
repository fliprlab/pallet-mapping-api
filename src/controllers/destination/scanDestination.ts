import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import validators from "../../validators";
import dao from "../../dao";

export const scanDestination = async (req: Request, res: Response) => {
  try {
    const { scan } = req.body;

    const destination = await dao.destination.scanDestination({
      inputString: scan,
    });

    if (destination == "") {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Invalid Destination Scanned",
        message: `Invalid Destination ${scan}. Scan the valid location`,
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Destination Founded",
      message: "Destination scanned successfully",
      data: destination,
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
