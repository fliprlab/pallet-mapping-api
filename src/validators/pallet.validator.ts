import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorFormatter } from "../utils/error-formatter";
import { JsonResponse } from "../utils/jsonResponse";
import { REGX } from "../constants";

export const palletValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body("palletId")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("Pallet id required")
      .matches(REGX.PALLET_ID)
      .withMessage("Enter a valid pallet id"),
  ];

  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req).formatWith(errorFormatter);

  if (errors.isEmpty()) {
    next();
  } else {
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      title: "Invalid Pallet Id",
      message: errors.array()[0].error,
      data: errors.array(),
    });
  }
};
