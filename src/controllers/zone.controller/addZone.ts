import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import dao from "../../dao";
import validators from "../../validators";

export const addZone = async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
    const { zone } = req.body;

    // check zone formate
    if (!validators.zone.valideZone(zone)) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "OOPS!",
        message: "Invalid Zone ID Format, Please enter correct zone ID",
      });
    } else if (!validators.zone.valideZoneId(zone)) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "OOPS!",
        message: "Invalid Zone ID Format, Please enter correct zone ID",
      });
    }

    // find location
    const find = await dao.zone.findZone(zone);
    if (find) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "OOPS!",
        message: "Zone already added.",
      });
    }

    const inserted = await dao.zone.addZone({
      zone: zone,
      createdBy: {
        _id: userId,
        date: new Date(),
      },
    });

    if (!inserted) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Not Created",
        message: "Can not create zone. Please try again.",
      });
    }

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Created",
      message: "Zone created successfully.",
    });
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
