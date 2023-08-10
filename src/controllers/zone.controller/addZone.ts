import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";

export const addZone = async (req: Request, res: Response) => {
  try {
    const {} = req.body;
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
